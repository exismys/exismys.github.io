# Physics Simulations Are Not as Simple as I Naively Thought

**date:** `2026-10-27` `12:30` `UTC+5:30`  
**tags:** `physics` `computer science` `programming`      


Physics simulations are way harder than I realised before. I used to think on the surface overall about physics simulation as a problem of finding out all the forces acting on a body and deriving its motion.

**forces -> idea about motion ($\frac{F}{m}$) -> generate the geometry/path**

Well, this seems pretty simple, isn't it?

NO. It's not.

In real world it is that simple, but in a descrete computer world it's a BIG NOT.

And the main reason is that in real world, you can keep measuring instantaneous rate of change of a quantity each instant and predict motion over a window because the real world is continuous and allows two subsequent instant to be infinitesimally apart which can be represented with limits.

But, in computer world, there is no such thing as infinitesimally small step/instance which approaches 0. In the computer world, the next instance is determined by its **CPU clock**. 

So, let's say if you have a CPU hardware running at a frequency of **3 GHz**, then the next instant that you can access is apart by:

$$T = \frac{1}{f} = \frac{1}{3 \times 10^9}$$

$$T \approx 0.333 \text{ nanoseconds}$$

When you predict a quantity over such a long interval (the actual interval is way longer than the raw CPU clock time) based on its instantaneous rate of change, you obviously are going to introduce errors. As a result, you are going to have to manage the errors and course correct.

The way to manage errors and course correction is to know the **constraints** and at each descrete instance, force the simulation to follow those constraints.

One example of constraints I can think of right now (because that's somewhat related to what I am working on currently) is some object suspending, tied to one end of a rope while the other end of the rope is fixed. Now you can lift up the object and let it fall under gravity so it follows a certain path. The one constraint/fact we know here is that it can never exceed the length of the rope (ideal rope) i.e. it can never go beyond a certain distance from the fixed end of the rope. So, if we are trying to simulate something like this we are going to need to course correct every instant so that the simulation doesn't violate this constraint.

The other constraint we can track is energy in a system because as long as the system is closed, the energy is going to be constant.
