# Geometric Interpretation of Matrix-Vector and Matrix-Matrix Multiplication

**date:** `2025-09-14` `13:21` `UTC+5:30`  
**tags:** `math`
**status:** `draft`


When we think of multiplication in general, we think of it as something that scales something "original". For example, multiplying a number $2$ with another number $x$ means that we double the number $x$ or increase $2$ by $x$ times.


## Matrix-Vector Multiplication ($ A \mathbf{v} $)

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

Here, $\mathbf{v}$ can be thought of as vector in component form: $\mathbf{x\hat{i}+y\hat{j}}$.

Matrix $A$ on the other hand, is just a set of numbers arranged in $m$ rows and $n$ coloumns $(m \times n)$. In this specific case, we have $(m \times n) = (2, 2)$.

The matrix currently seems meaningless unless we give it some meaning. Vectors in contrast, have meaning, i.e., they represent a point in space. They can be thought of as the point you get when you move **$x$ unit along x-axis** and **$y$ unit along y-axis**.

Inspecting the component form of the vector $\mathbf{v}$, $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ can be considered as the basic vectors with length 1. They are the building blocks of all the other vectors. We can derive or reach any vector/point in plane/space by adding the scaled basis vectors. For example, to reach a point $\mathbf{(x, y)}$, $\mathbf{\hat{i}}$ (of length 1) can be scaled by $\mathbf{x}$ and $\mathbf{\hat{j}}$ (of length 1) can be scaled by $\mathbf{y}$, and they can be finally added together to give us our vector $\mathbf{v}$.

We define matrix-vector multiplication as following:

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

Doesn't that sum look familiar? It looks like two vectors are getting scaled by $\mathbf{x}$ and $\mathbf{y}$ respectively and being added together. It's same as the definition of any vector: combination of scaled basic vectors. And so, we can think of 
$
\begin{bmatrix}
a_1 & a_2 \\
b_1 & b_2
\end{bmatrix} 
$
as some sort of basic vectors? Yes, we have a nice interpretation for them. We can think of each coloumn of the matrix as the new position of original basis vectors $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ after some transformation (**like rotation, or shear**). More clearly, after a transformation,

$\mathbf{\hat{i}}$ lands at $a_1\mathbf{\hat{i}} + b_1\mathbf{\hat{j}}$

$\mathbf{\hat{j}}$ lands at $a_2\mathbf{\hat{i}} + b_2\mathbf{\hat{j}}$

What it actually means is that if we were to find out the new position a vector after some transformation (like rotation, or shear), we only need to know where our original basic vectors $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ landed in order to find the new position of all the other vectors as they are simply the combination of basic vectors.

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

And we now have an geometric interpretation of matrix-vector multiplication.

In conclusion, matrix represents the new location of our basic vectors. It makes it very convenient to find out where a vector $\mathbf{v}$ lands after a transformation. We only need a record of our new basic vectors.


## Matrix-Matrix Multiplication ($ A B $)