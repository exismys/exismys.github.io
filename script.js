const GITHUB_USERNAME = 'exismys';
const BLOG_REPO_NAME = 'blog';
const BLOG_FOLDER_PATH = 'blogs';
const TIL_FOLDER_PATH = 'til';

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    function showSection(targetSection) {
        // Update active nav link
        navLinks.forEach(nl => nl.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-section="${targetSection}"]`);
        if (activeLink) activeLink.classList.add('active');
        
        // Show/hide sections
        sections.forEach(section => {
            if (section.id === `${targetSection}-section`) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });

        // Load blogs if switching to blogs section
        if (targetSection === 'blogs' && !document.querySelector('.blog-list')) {
            fetchBlogList();
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.dataset.section;

            // Update URL hash
            window.location.hash = targetSection;
            
            showSection(targetSection);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1) || 'home';
        showSection(hash);
    });
    
    // Load correct section on page load based on URL hash
    const initialSection = window.location.hash.substring(1) || 'home';
    showSection(initialSection);

    // Load blogs on initial page load
    fetchBlogList();
    fetchTILEntries();
});

async function fetchBlogList() {
    const container = document.getElementById('blog-container');
    
    try {
        const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${BLOG_REPO_NAME}/contents/${BLOG_FOLDER_PATH}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const files = await response.json();
        
        // Filter for markdown, text, and html files
        const blogFiles = files.filter(file => {
            return /\.(md|txt|html)$/i.test(file.name) && file.type === 'file';
        });
        
        // Fetch content for each blog file to parse metadata
        const blogsWithMetadata = await Promise.all(
            blogFiles.map(async (file) => {
                try {
                    const contentResponse = await fetch(file.download_url);
                    const content = await contentResponse.text();
                    
                    return parseBlogMetadata(file, content);
                } catch (error) {
                    console.error(`Error fetching content for ${file.name}:`, error);
                    return {
                        filename: file.name,
                        title: file.name,
                        date: new Date(file.name.match(/\d{4}-\d{2}-\d{2}/) || '2024-01-01'),
                        tags: [],
                        url: file.html_url,
                        downloadUrl: file.download_url
                    };
                }
            })
        );
        
        // Sort by date (newest first)
        blogsWithMetadata.sort((a, b) => b.date - a.date);
        
        displayBlogList(blogsWithMetadata);
        
    } catch (error) {
        console.error('Error fetching blog list:', error);
        container.innerHTML = `<p class="error">Error loading blog posts: ${error.message}</p>`;
    }
}

function parseBlogMetadata(file, content) {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    let title = file.name;
    let date = new Date();
    let tags = [];
    
    // Parse the first few lines for metadata
    for (let i = 0; i < Math.min(4, lines.length); i++) {
        const line = lines[i].trim();
        
        // Parse title from markdown heading (# Title)
        if (line.startsWith('# ')) {
            title = line.substring(2).trim();
            continue;
        }
        
        // Parse date line (**date:** `2025-09-07` `4:00` `UTC+5:30`)
        if (line.includes('**date:**')) {
            const dateMatch = line.match(/`(\d{4}-\d{2}-\d{2})`/);
            if (dateMatch) {
                date = new Date(dateMatch[1]);
            }
            continue;
        }
        
        // Parse tags line (**tags:** `tag1` `tag2` `tag3`)
        if (line.includes('**tags:**')) {
            const tagMatches = line.match(/`([^`]+)`/g);
            if (tagMatches) {
                tags = tagMatches.map(match => match.replace(/`/g, ''));
            }
            continue;
        }
    }
    
    return {
        filename: file.name,
        title: title,
        date: date,
        tags: tags,
        url: file.html_url,
        downloadUrl: file.download_url
    };
}

function displayBlogList(blogFiles) {
    const container = document.getElementById('blog-container');
    
    if (blogFiles.length === 0) {
        container.innerHTML = '<p>No blog posts found.</p>';
        return;
    }
    
    const blogList = document.createElement('ul');
    blogList.className = 'blog-list';
    
    blogFiles.forEach(blog => {
        const listItem = document.createElement('li');
        listItem.className = 'blog-item';
        
        const tagsHTML = blog.tags.length > 0 
            ? `<div class="blog-tags">Tags: ${blog.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>`
            : '';
        
        listItem.innerHTML = `
            <a href="${blog.url}" class="blog-title" target="_blank">${blog.title}</a>
            <div class="blog-meta">${formatDate(blog.date)}</div>
            ${tagsHTML}
        `;
        
        blogList.appendChild(listItem);
    });
    
    container.innerHTML = '';
    container.appendChild(blogList);
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

async function fetchTILEntries() {
    const container = document.getElementById('til-container');
    
    try {
        const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${BLOG_REPO_NAME}/contents/${TIL_FOLDER_PATH}/til.md`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fileData = await response.json();
        const contentResponse = await fetch(fileData.download_url);
        const content = await contentResponse.text();
        
        const tilEntries = parseSingleTILFile(content);
        displayTILEntries(tilEntries);
        
    } catch (error) {
        console.error('Error fetching TIL entries:', error);
        container.innerHTML = `<p class="error">Error loading TIL entries: ${error.message}</p>`;
    }
}

function parseSingleTILFile(content) {
    const entries = [];
    const sections = content.split(/^## (\d{4}-\d{2}-\d{2})$/gm);
    
    // Skip the first element (content before first date)
    for (let i = 1; i < sections.length; i += 2) {
        const dateStr = sections[i];
        const entryContent = sections[i + 1];
        
        if (dateStr && entryContent) {
            const date = new Date(dateStr);
            
            // Process content - convert basic markdown to HTML
            let processedContent = entryContent.trim()
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic  
                .replace(/`([^`]+)`/g, '<code>$1</code>') // Inline code
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>') // Links
                .replace(/\n\n/g, '</p><p>') // Paragraphs
                .replace(/\n/g, '<br>'); // Line breaks
            
            // Wrap in paragraph tags
            processedContent = '<p>' + processedContent + '</p>';
            
            entries.push({
                date: date,
                content: processedContent
            });
        }
    }
    
    return entries;
}

function displayTILEntries(entries) {
    const container = document.getElementById('til-container');
    
    if (entries.length === 0) {
        container.innerHTML = '<p>No TIL entries found.</p>';
        return;
    }
    
    const entriesHTML = entries.map(entry => `
        <div class="til-entry">
            <div class="til-date">${formatDate(entry.date)}</div>
            <div class="til-content">${entry.content}</div>
        </div>
    `).join('');
    
    container.innerHTML = entriesHTML;
}