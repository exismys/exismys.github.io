# Geometric Interpretation of Matrix-Vector and Matrix-Matrix Multiplication

**date:** `2026-07-09` `03:00` `UTC+5:30`  
**tags:** `math` `graphics`


When we think of multiplication in general, we think of it as something that scales something "original". For example, multiplying a number $x$ with another number $2$ means that we double the number $x$ or increase $2$ by $x$ times.


## Matrix-Vector Multiplication ($A \mathbf{v}$)

Now, consider matrix-vector multiplication $A\mathbf{v}$,
$$
\begin{bmatrix}
a_1 & a_2 \\
b_1 & b_2
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$

Here, $\mathbf{v}$ can be thought of as a vector in the component form: $\mathbf{x\hat{i}+y\hat{j}}$.

Matrix $A$ on the other hand, is just a set of numbers arranged in $m$ rows and $n$ columns $(m \times n)$. In this specific case, we have $(m \times n) = (2 \times 2)$.

The matrix currently seems meaningless unless we give it some meaning. Vectors in contrast, have meaning, i.e., they represent a point in space. They can be thought of as the point you get when you move **$x$ units along x-axis** and **$y$ units along y-axis**.

Inspecting the component form of the vector $\mathbf{v}$, $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ can be considered as the basis vectors with length 1. They are the building blocks of all the other vectors. We can derive or reach any vector/point in plane/space by adding the scaled basis vectors. In other words, we can express any vector in the plane as **linear combination** of the basis vectors. For example, to reach a point $\mathbf{(x, y)}$, $\mathbf{\hat{i}}$ (of length 1) can be scaled by $\mathbf{x}$ and $\mathbf{\hat{j}}$ (of length 1) can be scaled by $\mathbf{y}$, and they can be finally added together to give us our vector $\mathbf{v}$.

We define matrix-vector multiplication as follows:

$$
\begin{bmatrix}
a_1 & a_2 \\
b_1 & b_2
\end{bmatrix}

\begin{bmatrix}
x \\
y
\end{bmatrix}

=

\begin{bmatrix}
a_1 \\
b_1
\end{bmatrix}
x

+

\begin{bmatrix}
a_2 \\
b_2
\end{bmatrix}
y
$$

Doesn't that sum look familiar? It looks like two vectors are getting scaled by $\mathbf{x}$ and $\mathbf{y}$ respectively and being added together. It's same as the definition of any vector: combination of scaled basis vectors. And so, can we think of $\begin{bmatrix} a_1 & a_2 \\ b_1 & b_2 \end{bmatrix}$ as some sort of basis vectors? Yes, we have a nice interpretation for them. We can think of each column of the matrix as the new position of the original basis vectors $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ after some transformation (**like rotation, or shear**). More clearly, after a transformation,

$\mathbf{\hat{i}}$ lands at $a_1\mathbf{\hat{i}} + b_1\mathbf{\hat{j}}$

$\mathbf{\hat{j}}$ lands at $a_2\mathbf{\hat{i}} + b_2\mathbf{\hat{j}}$

What it actually means is that if we were to find out the new position of a vector after some transformation (like rotation, or shear), we only need to know where our original basis vectors $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ landed as it will simply be the combination of our transformed basis vectors.

If we continue solving further, we get our transformed vector:

$$
\begin{bmatrix}
a_1 & a_2 \\
b_1 & b_2
\end{bmatrix}

\begin{bmatrix}
x \\
y
\end{bmatrix}

=

\begin{bmatrix}
a_1 x \\
b_1 x
\end{bmatrix}

+

\begin{bmatrix}
a_2 y\\
b_2 y
\end{bmatrix}

$$

$$
\begin{bmatrix}
a_1 & a_2 \\
b_1 & b_2
\end{bmatrix}

\begin{bmatrix}
x \\
y
\end{bmatrix}

=

\begin{bmatrix}
a_1 x + a_2 y\\
b_1 x + b_2 y
\end{bmatrix}
$$

Each row of the matrix computes one component of the output vector.

And we now have a geometric interpretation of matrix-vector multiplication.

**In conclusion**, a matrix represents the new location of our basis vectors. Every vector is built from the basis vectors. Therefore, once we know where the basis vectors move, we automatically know where every other vectors move. It makes it very convenient to determine where a vector $\mathbf{v}$ lands after a transformation. We only need a record of our new basis vectors.


## Matrix-Matrix Multiplication ($A B$)

Now that we have a geometric interpretation of matrix-vector multiplication, let's consider what something like this could mean:

$$
\begin{bmatrix}
c_1 & c_2 \\
d_1 & d_2
\end{bmatrix}
\begin{bmatrix}
a_1 & a_2 \\
b_1 & b_2
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$

Traversing from right to left, we can guess that the first two terms represent matrix-vector multiplication that results in another vector $\mathbf{v'}$ which is the transformed original vector $\mathbf{v}$.

Now, the third term can also be thought of as another matrix which transforms the already transformed vector $\mathbf{v'}$ into a new vector $\mathbf{v''}$.

So, all the terms combined can be thought of as two subsequent transformations ($\mathbf{v}$ -> $\mathbf{v'}$ -> $\mathbf{v''}$).

There are many applications of these transformations operations. The one that I find most interesting is their application in graphics. For example, we click some button to move forward and move our mouse to rotate the camera/view in some video game. What's happening behind the scenes, is we are applying transformation on all the points/coordinate visible to us.

There is a caveat in doing many subsequent transformation in such applications because they are computationally heavy and they require dedicated code blocks for each such subsequent transformation which can be little messy/inelegant to track. To solve this, we can combine multiple transformation matrices and get a final transformation matrix which then can be multiplied to a vector to transform that vector. So, if we leave out the first term from left which is a vector, and combine both the 2nd and 3rd terms, we get a final transformation matrix. That combination is exactly what **matrix-matrix multiplication** is.

Matrix-matrix multiplication is defined as follow:

$$
\begin{bmatrix}
c_1 & c_2 \\
d_1 & d_2
\end{bmatrix}
\begin{bmatrix}
a_1 & a_2 \\
b_1 & b_2
\end{bmatrix}
=
\begin{bmatrix}
c_1 a_1 + c_2 b_1 & c_1 a_2 + c_2 b_2 \\
d_1 a_1 + d_2 b_1 & d_1 a_2 + d_2 b_2
\end{bmatrix}
$$

We can derive the result by solving the subsequent transformations as shown in my Ipad scribbles :)


![Geometric interpretation of matrix-matrix multiplication](/assets/images/matrices-1.png)
![Geometric interpretation of matrix-matrix multiplication](/assets/images/matrices-2.png)

There is another interesting term called **inverse matrix** of $A$ represented $A^{-1}$ which when multiplied with $A$ resets the transformation by $A$.

Mathematically, $A^{-1} (A \mathbf{v}) = \mathbf{v}$

With this, we are done. We now have geometric intuition for both matrix-vector and matrix-matrix multiplication.

In summary,

**Matrix-vector multiplication:** Transforms a vector.

**Matrix-matrix multiplication:** Combines subsequent transformation represented by each matrix into a single transformation matrix.
