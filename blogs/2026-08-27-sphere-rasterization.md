# Sphere Rasterization: How to Create a Sphere Mesh

**date:** `2026-08-27` `4:00` `UTC+5:30`  
**tags:** `math` `programming`       


Mesh of an object is basically a description of all the descrete coordinates/vertices that constitute the object and how vertices could be joined together to form a set of fundamental rendering unit (like a triangle).

For example, 

- a square can be constructed with 4 vertices (let's assume A, B, C, and D) which can be arranged in two triangles ABC and BCD.

- similarly, a cube can be constructed with further utilizing our squares as the faces of the cube.

Here, we are going to focus on constructing a sphere.

We can locate a point on a sphere surface in terms of **latitude and longitude angles** by visualizing radius as a position vector so that its position can be determined by two angles $\theta$ and $\phi$ (latitude and longitude angles respectively). Refer my scribble below:  

![Sphere Math](/assets/images/sphere-rasterization.png)

In a continuous world, we can locate all the points that constitute the surface of a sphere by sweeping $\theta$ from north pole to south pole $[0, \pi]$ to cover full latitude range and for each $\Delta \theta \to 0$, sweeping $\phi$ to complete a whole circle $[0, 2\pi]$.

But, in a descrete world, we can't sweep smoothly... so we must manage by covering angles in descrete step using two input parameters: **number of latitude and longitude steps**. 

Notice that the criss-crossing of latitude and longitude lines creates many quadrilaterals. We can then choose each of these quadrilaterals and consequently get all the required triangles which are again our fundamental rendering unit.

We can write this in code:

```cpp
Mesh create_sphere_mesh(int latitudes, int longitudes, float radius) {
    std::vector<Vec3> vertices;
    std::vector<Triangle> triangles;

    for (int i = 0; i <= latitudes; i++) {
        float theta = i * (PI / (latitudes * 4));
        float sin_theta = std::sin(theta);
        float cos_theta = std::cos(theta);

        for (int j = 0; j <= longitudes; j++) {
            float phi = j * (2.0f * PI / longitudes);
            float sin_phi = std::sin(phi);
            float cos_phi = std::cos(phi);

            float x = radius * sin_theta * cos_phi;
            float y = radius * cos_theta;
            float z = radius * sin_theta * sin_phi;

            std::cout << x << y << z << "\n";

            vertices.push_back({x, y, z});
        }
    }

    for (int i = 0; i < latitudes; i++) {
        for (int j = 0; j < longitudes; j++) {

            // Indices for the 4 corners of the current quad
            int top_left = i * (longitudes + 1) + j;
            int top_right = top_left + 1;
            int bottom_left = (i + 1) * (longitudes + 1) + j;
            int bottom_right = bottom_left + 1;


            // Triangles with clockwise winding
            triangles.push_back({
                {top_left, top_right, bottom_left},
                Colors::Yellow 
            });

            triangles.push_back({
                {bottom_left, top_right, bottom_right},
                Colors::Yellow
            });
        }
    }
    
    return Mesh {
        vertices,
        triangles
    };
}
```
**Final Result:**

![Sphere Rendered](/assets/images/rendered_rasterized_sphere_flat_shaded%202.png)
