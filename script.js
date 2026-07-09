// Configurations
const BLOG_FOLDER_PATH = 'blogs';
const BLOG_INDEX = 'blog-index.json';
const TIL_FOLDER_PATH  = 'til';
const TIL_ENTRY_FILE = `til.md`

//===========================================================================
// Setup markdown parser
//===========================================================================
const mdParser = window.markdownit({
    html: true,
    linkify: true,
    typographer: true
});

mdParser.use(texmath, {
    engine: katex,
    delimiters: "dollars",
    katexOptions: {
        throwOnError: false
    }
});
//===========================================================================


//===========================================================================
// Navigation
//===========================================================================
let blogsLoaded = false;
let tilLoaded   = false;

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function showSection(name) {
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === name));
        sections.forEach(s => s.classList.toggle('active', s.id === `${name}-section`));

        if (name === 'blog' && !blogsLoaded) fetchBlogList();
        if (name === 'til'  && !tilLoaded)   fetchTILEntries();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.dataset.section;
            history.pushState(null, '', `#${target}`);
            showSection(target);
        });
    });

    window.addEventListener('popstate', () => {
        showSection(window.location.hash.slice(1) || 'home');
    });

    // Back button in post reader
    document.getElementById('blog-back-btn').addEventListener('click', closePost);

    const initial = window.location.hash.slice(1) || 'home';
    showSection(initial);
});
//===========================================================================


//===========================================================================
// Blog List
//===========================================================================
async function fetchBlogList() {
    blogsLoaded = true;
    const container = document.getElementById('blog-container');

    try {
        const blogIndex = await fetch(`./${BLOG_FOLDER_PATH}/${BLOG_INDEX}`);
        if (!blogIndex.ok) {
            throw new Error(`Cound not fetch blog index at ./${BLOG_FOLDER_PATH}/${BLOG_INDEX}`);
        }

        const files = await blogIndex.json();

        const pinnedFiles = files.pinned || [];
        const normalFiles = files.posts || data;

        const loadMeta = async (fileName) => {
            const relativeUrl = `./${BLOG_FOLDER_PATH}/${fileName}`;
            try {
                const content = await (await fetch(relativeUrl)).text();
                return parseMeta(fileName, content, relativeUrl);
            } catch {
                return {
                    title: fileName, date: new Date(), tags: [],
                    draft: false, downloadUrl: relativeUrl
                };
            }
        };

        const [pinnedMeta, blogsMeta] = await Promise.all(
            [
                Promise.all(pinnedFiles.map(loadMeta)),
                Promise.all(normalFiles.map(loadMeta))
            ]
        );

        blogsMeta.sort((a, b) => b.date - a.date);
        renderBlogList(blogsMeta, pinnedMeta);
    } catch (err) {
        container.innerHTML = `<p class="error">Could not load posts: ${err.message}</p>`;
    }
}

function parseMeta(fileName, content, relativeUrl) {
    const lines  = content.split('\n').filter(l => l.trim());
    let title    = fileName;
    let date     = new Date();
    let tags     = [];
    let draft    = false;

    for (let i = 0; i < Math.min(8, lines.length); i++) {
        const l = lines[i].trim();

        if (l.startsWith('# ')) {
            title = l.slice(2).trim();
        } else if (l.includes('**date:**')) {
            const m = l.match(/`(\d{4}-\d{2}-\d{2})`/);
            if (m) date = new Date(m[1]);
        } else if (l.includes('**tags:**')) {
            const m = l.match(/`([^`]+)`/g);
            if (m) tags = m.map(t => t.replace(/`/g, ''));
        } else if (l.includes('**status:**')) {
            const m = l.match(/`(draft|published)`/i);
            if (m?.[1]?.toLowerCase() === 'draft') {
                draft = true;
                date  = new Date('1970-01-01');
                tags.push('draft');
            }
        }
    }

    return { title, date, tags, draft, downloadUrl: relativeUrl };
}

function renderBlogList(blogsMeta, pinnedMeta = []) {
    const container = document.getElementById('blog-container');
    container.innerHTML = '';

    if (!blogsMeta.length && !pinnedMeta.length) {
        container.innerHTML = '<p class="status">No posts yet.</p>';
        return;
    }

    const createPostListItem = (meta, isPinnedItem = false) => {
        const li = document.createElement('li');
        li.className = `blog-item${meta.draft ? ' is-draft' : ''}${isPinnedItem ? ' is-pinned' : ''}`;

        const tagsHTML = meta.tags.length
            ? `<div class="blog-tags">${meta.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
            : '';

        li.innerHTML = `
            <div class="blog-main-info">
                <span class="blog-title">${meta.title}</span>
                <span class="blog-meta">${formatDate(meta.date)}</span>
                ${tagsHTML}
            </div>
        `;

        if (!meta.draft) {
            li.addEventListener('click', () => openPost(meta.downloadUrl));
        }

        return li;
    };

    // Build pinned section if items exist
    if (pinnedMeta.length) {
        const pinnedSection = document.createElement('div');
        pinnedSection.className = 'blog-pinned-wrapper';
        
        const label = document.createElement('div');
        label.className = 'blog-section-label';
        label.innerText = 'Featured Writing';
        pinnedSection.appendChild(label);

        const ul = document.createElement('ul');
        ul.className = 'blog-list';
        pinnedMeta.forEach(meta => ul.appendChild(createPostListItem(meta, true)));
        
        pinnedSection.appendChild(ul);
        container.appendChild(pinnedSection);
    }

    // Build chronological feed section
    const feedSection = document.createElement('div');
    feedSection.className = 'blog-feed-wrapper';

    if (pinnedMeta.length) {
        const label = document.createElement('div');
        label.className = 'blog-section-label';
        label.innerText = 'All Entries';
        feedSection.appendChild(label);
    }

    const ul = document.createElement('ul');
    ul.className = 'blog-list';
    blogsMeta.forEach(meta => ul.appendChild(createPostListItem(meta, false)));
    feedSection.appendChild(ul);

    container.appendChild(feedSection);
}
//===========================================================================


//===========================================================================
// Blog Reader
//===========================================================================
async function openPost(downloadUrl) {
    const listView    = document.getElementById('blog-list-view');
    const postView    = document.getElementById('blog-post-view');
    const postContent = document.getElementById('blog-post-content');

    // Switch to post view
    listView.classList.add('hidden');
    postView.classList.remove('hidden');
    postContent.innerHTML = '<p class="status">Loading…</p>';
    window.scrollTo({ top: 0 });

    try {
        const res = await fetch(downloadUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const md = await res.text();

        postContent.innerHTML = mdParser.render(md);

        postContent.querySelectorAll("pre code").forEach(block => {
            hljs.highlightElement(block);
        });
    } catch (err) {
        postContent.innerHTML = `<p class="error">Failed to load post: ${err.message}</p>`;
    }
}

function closePost() {
    document.getElementById('blog-post-view').classList.add('hidden');
    document.getElementById('blog-list-view').classList.remove('hidden');
    window.scrollTo({ top: 0 });
}
//===========================================================================


//===========================================================================
// TIL
//===========================================================================
async function fetchTILEntries() {
    tilLoaded = true;
    const container = document.getElementById('til-container');

    try {
        const til = await fetch(`./${TIL_FOLDER_PATH}/til.md`);
        if (!til.ok) {
            throw new Error(`Could not find ${TIL_FOLDER_PATH}/${TIL_ENTRY_FILE}`);
        }

        const content = await til.text();

        renderTIL(parseTIL(content));
    } catch (err) {
        container.innerHTML = `<p class="error">Could not load learnings: ${err.message}</p>`;
    }
}

function parseTIL(content) {
    const entries  = [];
    const sections = content.split(/^## (\d{4}-\d{2}-\d{2})$/gm);

    for (let i = 1; i < sections.length; i += 2) {
        const dateStr = sections[i];
        const body    = sections[i + 1];
        if (dateStr && body) {
            entries.push({
                date: new Date(dateStr),
                html: mdParser.render(body.trim()),
            });
        }
    }
    return entries;
}

function renderTIL(entries) {
    const container = document.getElementById('til-container');

    if (!entries.length) {
        container.innerHTML = '<p class="status">No entries yet.</p>';
        return;
    }

    container.innerHTML = entries.map(e => `
        <div class="til-entry">
            <span class="til-date">${formatDate(e.date)}</span>
            <div class="prose til-body">${e.html}</div>
        </div>
    `).join('');
}
//===========================================================================


//===========================================================================
// Utility functions
//===========================================================================
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}
//===========================================================================
