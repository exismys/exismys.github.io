## 2026-09-01
**Rasterization of a 3D arrow:** I needed to have a shape resembling an arrow so that I can use them as visualization tools in my physics simulations. They will be indicating the direction of force & current velocity. It's actually a fairly complex thing if you focus on the rasterizing the arrow itself but it can be easily done by combining the meshes of much simpler shapes: cylinder and cone. We can use a thin cylinder as shaft of the arrow and a cone as arrowhead. And as we created the vertices and triangles for the sphere, we do the same for the cylinder and the cone. We use the following mathematical observation:

***Cylinder Rasterization:***
![Cylinder Rasterization](/assets/images/cylinder-rast.png)

***Cone Rasterization:***
![Cone Rasterization](/assets/images/cone-rast.png)

After these two rasterization are completed, we need to position them relative to each other. For example, we move all the vertices of cone by $\frac{h}{2}$ at the mesh level itself so that it's at the end of the cylinder resembling shaft and arrowhead respectively.

**Rasterization of a plane:** Well, I also tried to rasterize a plane to represent some sort of reference surface but my frame rate droped around 5-10 FPS probably because of working with lots of triangles & pixels. So, I decided to do the same with grid lines but well it was even worse now because the there was no clipping implemented for lines 🙁 and the projected vertices in screen space were just two big specially the ones near camera (probably in range of millions of pixel wide because $z \to 0$). So, the obvious thing remains. I have to implement clipping for lines.

## 2026-08-28
**Debugging:** As Linus said "debugging session from hell...", spent a lot of time debugging a bug which caused appearences of some flickering long streak of horizontal lines at both north and south poles of rendered spheres.

![long streak at pole](/assets/images/long-streak-at-pole.png)

The issue was with my interpolation function. I was trying to interpolate all the x-coordinates for left and right boundary so that I can rasterize a triangle using scanline. It turns out that I was using the slope calculation incorrectly: I calculated the slop as $\Delta{y}/\Delta{x}$ assuming I was working in continuous unit where the iteration step will be very small ($\to0$) but of course I am working with a computer so the step would be always in integer (1 pixel per step in my case). In other words, I calcuated rate of change for a small delta but actually step in the loop was higher. The fix was to calculate rate of change per pixel instead of instantaneous rate of change so that it matches the iteration steps. The change was very simple 😐: [github](https://github.com/exismys/BeLight/commit/d4e185d041c7e1bdabf67f1f50e32ac6acb024f2)

**Created a new blog:** [Sphere Rasterization: How to Create a Sphere Mesh](/index.html#blog?post=2026-08-27-sphere-rasterization.md)

## 2026-08-24
Continuing with the updates (this includes stuff I have been doing since Aug 7),

**Oscillation & Waves I:** I have gone through these two chapters also. Here are some interesting stuff:

***Relationship between Uniform Circular Motion & Simple Harmonic Motion:*** Oscillations are these recurring back and forth motion (at equal intervals) about some point called the equilibrium point. If an object is oscillating a particular point, an obvious conclusion is that there must be some sort of force pulling on object toward the equilibrium point. So, the motion can visualized by imagining an object on x-axis at $x = -1$ which is the farthest the object can go in the left direction from the equilibrium point $x = 0$. Assuming that there is some sort of force acting toward that equilibrium point, the object starts to move right and gains velocity (as $a \neq 0$). The moment object moves past the origin, the direction of the force inverts and causes it to deccelarate and momentarily stop at $x = 1$ (farthest right) and eventually reverses its motion to the left. The highest displacement from the equilibrium is called Amplitude. And so it goes on and on... Now, there might be various kinds of oscillating motion. One of those is **Simple Harmonic Motion (SHM)** which is when the force acting on the object is directly proportional to its displacement from the equilibrium point. It has the form:
$$F = -kx$$
It turns out that there is a special relationship between uniform circular motion and SHM; it's that if you track the former, you derive the later.

Consider a point $P$ revolving around a point $O$ at $x = 0$ with some velocity $\mathbf{v}$ so that its path traces a circle of radius $1$. We can use the radius joining $P$ and $O$ as the amplitude. The projection of the radius as $P$ revolves around $O$ represents SHM. We can notice when the $P$ is at $(1, 0)$, it's at its highest displacement from equilibrium point. The x-projection of $\mathbf{v}$ represents the velocity of the SHM, and the x-projection of acceleration (which is directed radially) represents the accelaration of SHM.

***Speed of waves in a medium:*** Speed of a wave propagating through a material is completely determined by the mechanical properties of that medium. Let's do a thought experiment... When we swing a string back and forth, our intuition might lead us to believe that swinging it faster might increase the speed at which the wave produced propogate through it. Contrary to that intuition, the moment we choose that rope, the speed is fixed. As we swing faster or lower, the frequency and wavelength gets adjusted instead.

## 2026-08-23
Quite a few updates:

**Conic Sections & Whispering Galleries:** Covered the equations of circles, parabolas, & ellipses. One very amusing thing about parabolas and ellipses is their reflection property. Well, parabolas are practically very useful and they have many applications in sciences and in our daily lives, for example search lights, radio telescopes, etc, but what I really want to talk about is ellipses. This reflection property of ellipses is used in the construction of something very amusing that we call whispering galleries. They are ellipsoidal rooms with two foci (as the requirement of being an ellipse, except a circle). If a person stands at one of the foci and whispers, another person standing at the other focus can hear it but anyone standing in between those two people can't. This happens because sound waves originating from one of the foci get reflected off the walls and ceilings of the room and arrive together at the other focus.

Found a video demonstrating this (so cool :0) from 7 years ago: [Whispering Gallery, Museum of Science and Industry, Chicago](https://www.youtube.com/watch?v=ausKK9aMz0o)

**Halley's Comet & eccentricity of an ellipse:** A blog I wrote on Halley's Comet orbit. Please read here:  [Halley's Comet & Eccentricity of Ellipses: A Thing about Meeting a Distant Forlorn Friend](/index.html#blog?post=2026-08-23-halleys-comet-and-eccentricity-of-an-ellipse.md)

**Three-Body Problem Simulation:** Created a simple (rough) simulation of Three-Body Problem using my own 3D software renderer and uploaded it as a video on YouTube :)
<div style="position: relative; width: 100%; padding-bottom: 56.25%;">
    <iframe
        src="https://www.youtube.com/embed/vxJKq9hLrig"
        title="Three-Body Problem Simulation"
        style="position: absolute; width: 100%; height: 100%; border: 0;"
        allowfullscreen>
    </iframe>
</div><br>

**Fluids:** An object floats on water only if the mass of water it replaces is equal to it's own mass. Did some scribbling about it...

![Condition for floating](/assets/images/condition-for-floating.png)

## 2026-08-07
**The effect of Earth's rotation on free-fall acceleration:** well, the gravitation acceleration ($g$) that we have studied and applied thoughout our high school is different from free-fall acceleration. In practice, we treat them the same and use $g$ naturally throughout but the actual acceleration experience by an object is different from the gravitation acceleration ($g$) because of centrifugal effect caused by Earth's rotation. The actual acceleration is little less than the gravitational acceleration, counteracted by the centrifugal force experience by an object as it's rotating with the Earth.

## 2026-07-14
I have not been able to write this update because of the recent trip planning and stuff. So, mainly on July 11th and 12th, I worked on sphere rasterization (low poly style) to use them as general objects like stars and planets in three body simulation :)

On a high level, we sweep from north pole to south pole (0 to π) to get a whole latitude line, and for each iteration step of that latitude line, we sweep through (0 to 2π) to get the longitude lines.

Also implemented a kind of bridge between my simulation state (physics) and rendering so that they can each remain seperate and not get intertwined with each other. Simulation module now determines the number of objects and their type, and their physical state, and rasterization module handles the rendering.

I am currently on a trip, so won't be able to do much on the coding part but hopefully will be doing some reading.

## 2026-07-09
In last 2-3 days, 

I have written a blog on geometric interpretation of matrix-vector and matrix-matrix multiplication: [geometric interpretation of matrices](/index.html#blog?post=2026-07-09-matrix-vector-and-matrix-matrix%20multiplication.md)

Studied various **shading** techniques (flat, gouraud, and phong). Only implemented flat for now. The goal is to move on as soon as possible to physics simulations and not get stuck in minor visual improvements. **Flat shading** is a technique where we calculate the the effect of lighting at the center of a triangle and use the same for all the points of the triangle.

On how to compute the lighting itself (with triangle normals and light direction), I am very soon going to write a blog on the topic or scribbles :)

## 2026-07-05
**Back Face Culling** allows us to categorize triangles constituting an object into **front facing triangles** (visible to camera) and **back facing triangles** (not visible to the camera, covered by front facing triangles).

We determine this by checking if the **dot product** of outward normal of a triangle (constituting a closed body) and view vector (from normal's tail to camera) is +ve (front facing) or -ve (back facing).

We find out the normal by doing a **cross product** of two of the triangles' side which are tail-to-tail. For example, in a triangle ABC, we get the sides in vector form as AB (by B - A) and AC ( by C - A). Doing a cross product of AB and AC results in a vector perpendicular to both (normal). 

We need to stick to a particular winding order of triangles' vertices to that the resultant normal points in the outward direction.

## 2026-07-01
I have not updated this website in last 3 months. I have been doing (on and off) a lot of stuff related to 3D software rendering that I am gonna list:

- **Ray Tracing:** I learnt about Ray Tracing and it was the coolest thing ever because it was so close to several domains like maths and physics. We are literally tracing around a million of rays to find their intersections with the objects in the scene and painting their respective color accordingly. I also got around to implement lightning (point, directional, ambient), reflections (diffuse & specular), recursive mirror reflection (one of the coolest stuff in ray tracing). I learnt how we can render physics accurate scenes (although they require high compute).

- **Rasterization:** Even though Ray Tracing allows us to render realistic scenes, they are highy inefficient as we do a lot of calculation per pixel per frame. Rasterization is a technique where the flow is opposite to that of Ray Tracing. Instead of tracking every pixel, we track objects and determine which pixels should be drawn for a particular object. This is a lot faster than doing calculation for each pixel on the screen (at the cost of accuracy). I implemented line & triangle rasterization (wireframe, filled, & shaded) which are primitive structures using which you can render all other structures. I also learnt about general graphic pipeline: **model matrix -> view matrix -> clipping -> perspective divide -> viewport transform (from canvas/viewport to screen scoordinates) -> rasterization**.

- **Graphic Math:** This was part of the **rasterization** itself but i think it deserves its own section. I learnt about matrix transformation which lets us transform vertices in our scenes allowing us to implement translation, rotations, etc. I learnt about clipping which lets us skip all the triangles that are not inside our view (called the clip space). Clipping required concepts like equations of plane, its distance from a particular point, and how to determine the side of plane where the point lies. I also learnt about interpolation and in what cases it could have subtle bug (z_value interpolation, where the the z coordinate is not a linear function of projected x & y coordinates: x' and y').

- **Physics & Maths:** I studied several topics in mechanics like:
    - **Rotation:** Got introduced to rotational variables and how do they related with translational variables. How we can use **nested/multiple integrals** to sweep over surfaces and volumes to find out their rotational inertia.
    - **Rolling, Torque, & Angular Momentum:** I understood how rolling can be seen as a combination of rotational and translational motion. Explored in detail how torque and angular momentum are related. This is very easily understood through the experiment **Precession of a Gyroscope** (one of the awe inspiring and eye opening stuff).
    - **Equilibrium & Elasticity:** Understood the conditions required for an object to be equilibrium and static equilibrium. Understood the concept of **center of gravity** and how it is different from center of mass. Learnt about elasticity which is study of how real bodies deform when forces are applied to them. Learnt to calculate relevant terms like stress and strain on a body.

## 2026-03-24
It makes sense to have **Potential energy reference height** (often set to 0), as it's that exact height from which we start to account for the change in the kinetic energy. During a flight, kinetic energy was always changing but if we only take a subset of that whole motion, we start accounting change in kinetic energy (transfer from kinetic to potential) just for that subset interval.

## 2026-03-23
**Shaders:** I heard about shaders a lot. They seemed some esoteric concepts. I started learning OpenGl and it turns out they are just tiny programs in GPU pipeline which run simultaneously for lot of objects/vertices/inputs.

## 2026-03-21
**Application of momentum conservation:** I had this misconception that a rocket pushes the air itself to propell itself to space. What actually happens is it pushes the fuel out ejecting mass at a very high speed in opposite direction of rocket's motion. The rocket get pushed in opposite direction so that the momentum is conserved.

## 2026-03-17
**Center of Mass** (a geometric position) of a system of particles moves as if the mass of the whole system is concentrated at that point. **Force** is redefined as the rate of change of momentum, which is how Newton stated his second law. **Momentum** of a system is **conserved** even though the individual momenta of particles can change inside a closed system. Internal collisions do not change the path of the center of mass unless an external force acts on the system. Total change in momentum is defined to be **Impulse**, which is equivalent to the time integral of the force function from time t1 to t2. **Average force** acting would be defined as **Impulse per unit time.**

## 2026-03-05
**Energy** rn is not something that moves objects. It does not do anything. It's a number/property (mathematical?) associated with a system's configuration, and it is conserved. So it's a constraint on how systems can be configured at any given moment. It's like I'm a programmer and I created matter with arbitrary properties (like mass and charge in the real world, but different) and I threw an arbitrary number and said configure yourself however you like but a specific relation of the properties of the matter always has to be equal to the arbitrary number. Each movement/change has to account for this.

## 2025-09-25
**Geometric interpretation of vector dot product:** Vector dot product can seen as "how much two vectors align with each other," i.e. how much they point in the same direction. A • B = |A||B| (cos of angle between them) can be interpreted as product of magnitude of vector A and the component vector B in the direction of A.
Greater the result, greater the alignment. if they are perpendicular (cos of angle is 0), no alignment. If -ve, negative alignment, i.e. the component of one in the direction of other is negative.

## 2025-09-14
**Geometric interpretation of inverse matrix ($A^{-1}$):** In essence, it's a transformation applied on a transformed vector $\mathbf{V'}$ (by matrix $A$), so that $\mathbf{V'}$ transforms to original $\mathbf{V}$. No transformation at all $(A^{-1} A)$.

## 2025-09-08
**Overloading [] operator in C++:** two varients, `double& operator[](int i);` and `double operator[](int i) const;`. First one returns a reference to actual data member to which we can assign some value. Second one only works when called on a const object and returns just a value. Makes sense, can't assign a value to a value.

**Configuring C++ code run in VS code:** I was facing an issue with running C++ code in VS code through code run button because it was using `gcc` as a compiler. I could change this in `.vscode/tasks.json` to use `g++` instead.

Of course, I had to modify `.gitignore` after to ignore all `.vscode` except that one specific file.

`.gitignore` entry:
`.vscode/*`
`!.vscode/tasks.json`

## 2025-09-07
**URL Hash based routing:** This is actually very interesting, saves you load time switching between pages.

**Sine Wave Sampling:** Wrote a blog about producing sounds programmatically. More info here: [sine wave sampling](/index.html#blog?post=2025-09-07-sine-wave-sampling.md)

## 2025-09-06
**Latex Rendering in Markdown:** I learnt how to sprinkle latex code in markdown for stuff like math equations. We can wrap latex between `$`...`$` for inline and `$$`...`$$` for multiline. My first use here: [sine wave sampling](/index.html#blog?post=2025-09-07-sine-wave-sampling.md)

## 2025-09-03
**Matrices as Linear Transformation:** of vector space. Every matrix represents a linear transformation. A matrix $A$ takes a vector $\mathbf{v}$ as an input and transforms into a vector $\mathbf{v'}$. I am thinking of writing a blog on this.

## 2025-08-25
**PPM:** So, an image is just a text file with color data? .ppm image format is just a list of $C \times R$ colors. Check out [a sample C++ code which prints .ppm fomrat](https://github.com/exismys/HelloWorld/blob/master/cpp/audio-and-graphics/image.cpp). Save the output in a file with `./app.out > image.ppm` and you should be able to open it with any image viewer (unless you are using windows, then good luck). 
