## 2026-03-24
It makes sense to have **Potential energy reference height** (often set to 0), as it's that exact height from which we start to account for the change in the kinetic energy. During a flight, kinetic energy was always changing but if we only take a subset of that whole motion, we start accounting change in kinetic energy (transfer from kinetic to potential) just for that subset interval.

## 2026-03-23
**Shaders:** I heard about shaders a lot. They seemed some esoteric concepts. I started learning OpenGl and it turns out they are just tiny programs in GPU pipeline which run simultaneously for lot of objects/vertices/inputs.

## 2026-03-21
**Application of momentum conservation:** I had this misconception that a rocket pushes the air itself to propell itself to space. What actually happens is it pushes the fuel out ejecttimg mass at a very high speed in opposite direction of rocket's motion. The rocket get pushed in opposite direction so that the momentum is conserved.

## 2026-03-17
**Center of Mass** (a geometric position) of a system of particles moves as if the mass of the whole system is concentrated at that point. **Force** is redefined as the rate of change of momentum, which is how Newton stated his second law. **Momentum** of a system is **conserved** even though the individual momenta of particles can change inside a closed system. Internal collisions do not change the path of the center of mass unless an external force acts on the system. Total change in momentum is defined to be **Impulse**, which is equivalent to the time integral of the force function from time t1 to t2. **Average force** acting would be defined as **Impulse per unit time.**

## 2026-03-05
**Energy** rn is not something that moves objects. It does not do anything. It's a number/property (mathematical?) associated with a system's configuration, and it is conserved. So it's a constraint on how systems can be configured at any given moment. It's like I'm a programmer and I created matter with arbitrary properties (like mass and charge in the real world, but different) and I threw an arbitrary number and said configure yourself however you like but a specific relation of the properties of the matter always has to be equal to the arbitrary number. Each movement/change has to account for this.

## 2025-09-25
**Geometric interpretation of vector dot product:** Vector dot product can seen as "how much two vectors align with each other," i.e. how much they point in the same direction. A • B = |A||B| (cos of angle between them) can be interpreted as product of magnitude of vector A and the component vector B in the direction of A.
Greater the result, greater the alignment. if they are perpendicular (cos of angle is 0), no alignment. If -ve, negative alignment, i.e. the component of one in the direction of other is negative.

## 2025-09-14
**Geometric interpretation of inverse matrix A^-1:** In essence, it's a transformation applied on a transformed vector *V'* (by matrix *A*), so that V' transforms to original *V*. No transformation at all (A^-1 A).

## 2025-09-08
**Overloading [] operator in C++:** two varients, `double& operator[](int i);` and `double operator[](int i) const;`. First one returns a reference to actual data member to which we can assign some value. Second one only works when called on a const object and returns just a value. Makes sense, can't assign a value to a value.

**Configuring C++ code run in VS code:** I was facing an issue with running C++ code in VS code through code run button because it was using `gcc` as a compiler. I could change this in `.vscode/tasks.json` to use `g++` instead.

Of course, I had to modify `.gitignore` after to ignore all `.vscode` except that one specific file.

`.gitignore` entry:
`.vscode/*`
`!.vscode/tasks.json`

## 2025-09-07
**URL Hash based routing:** This is actually very interesting, saves you load time switching between pages.

**Sine Wave Sampling:** Wrote a blog about producing sounds programmatically. More info here: [sine wave sampling](https://github.com/exismys/Blog/blob/main/blogs/2025-09-07-sine-wave-sampling.md)

## 2025-09-06
**Latex Rendering in Markdown:** I learnt how to sprinkle latex code in markdown for stuff like math equations. $...$ for inline and $$...$$ for multiline. My first use here: [sine wave sampling](https://github.com/exismys/Blog/blob/main/blogs/2025-09-07-sine-wave-sampling.md)

## 2025-09-03
**Matrices as Linear Transformation:** of vector space. Every matrix represents a linear transformation. A matrix *A* takes a vector *V* as an input and transforms into a vector *V'*. I am thinking of writing a blog on this.

## 2025-08-25
**PPM:** So, an image is just a text file with color data? .ppm image format is just a list of C * R colors. Check out [a sample C++ code which prints .ppm fomrat](https://github.com/exismys/HelloWorld/blob/master/cpp/audio-and-graphics/image.cpp). Save the output in a file with `./app.out > image.ppm` and you should be able to open it with any image viewer (unless you are using windows, then good luck). 
