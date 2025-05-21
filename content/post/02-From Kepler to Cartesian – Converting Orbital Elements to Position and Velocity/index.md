---
title: "From Kepler to Cartesian – Converting Orbital Elements to Position and Velocity"
date: 2025-05-16T00:34:23+03:00
Description: ""
Tags: ["orbital mechanics", "astrodynamics"]
Categories: []
DisableComments: false
---

When you're just starting out in orbital mechanics, Keplerian elements can feel like the secret code of the cosmos: elegant, compact , they work! Six numbers that somehow capture the shape, tilt, and timing of the orbits's path around the Earth. 

You get eccentricity - telling you how circular something is 

Inclination - saying what is its tilt 
and then some of the less intuitive ones, like the Argument of Perigee, which simply tells you at what angle along the orbit the closest point (perigee) is.

But if you want to simulate anything, or visualize it, or plug it into a control system—you need real positions and velocities. Cartesian coordinates. 
```x, y, z. dx, dy, dz```. Something your computer can work with. In physics to model any dynamical what we always need is one its position(where is the thing we're interested in) and Two is velocity(how fast is it going), from there we can generate all that we need. 

So here’s the bridge: converting those six Keplerian elements into a six-dimensional state vector—position and velocity in 3D space. Below is a Python snippet I use to do exactly that. It uses standard rotations to map the Perifocal (PQW) frame into the Earth-Centered Inertial (ECI) frame, and it handles elliptical and circular orbits alike. I used it personally for making my own Runge-Kutta Numerical Integrator, I'll post the notes to that later as well how its done. 

Given:

- \( a \): semi-major axis  
- \( e \): eccentricity  
- \( f \): true anomaly  
- \( \mu \): standard gravitational parameter


#### PQW Frame of Reference (Just a 2D Frame of reference - note in reality all orbits can be described in 2D )
The PQW frame—also called the perifocal coordinate system—is a local frame attached to the orbital plane of the satellite.
The P axis points toward perigee (closest point in orbit).
The Q axis is 90° ahead in the orbital plane.
The W axis points normal (perpendicular) to the orbital plane.

**Position (PQW)**:

$$
  r = \frac{a(1 - e^2)}{1 + e \cos f}
$$

$$
  \vec{r}_{\text{PQW}} = \begin{bmatrix} r \cos f \\ r \sin f \\ 0 \end{bmatrix}
$$
See how the z- component is 0 that makes it exist only in 2D

**Velocity (PQW)**:

$$
  h = \sqrt{\mu a (1 - e^2)}
$$

$$
  \vec{v}_{\text{PQW}} = \begin{bmatrix} -\frac{\mu}{h} \sin f \\ \frac{\mu}{h}(e + \cos f) \\ 0 \end{bmatrix}
$$

#### Transformation to ECI Frame:
Now that the orbit exists in 2D it must be rotated into the correct orientation (3D) this rotational matrix will be responsible for that.
To transform from PQW to ECI, we apply three rotations:

**Argument of Perigee (AP)** – This rotates the orbit within its own plane. Think of it as rotating the ellipse around the satellite's angular momentum vector so that perigee points in the correct direction within the orbital plane.

**Inclination (i)** – This tilts the entire orbital plane by the correct amount, aligning it with the real-world tilt of the satellite's trajectory compared to Earth's equator.

**RAAN** – This rotates the tilted plane so that the ascending node—the point where the satellite crosses the equatorial plane going north—is placed at the correct angle from a fixed direction in space.

These steps are sequential and ordered for a reason:

First, we define the orbit’s shape within its own plane ().

Then we tilt that plane to match the orbital inclination ().

Finally, we orient the whole thing with respect to Earth’s inertial frame ().

Together, these build the full rotation matrix:
The full rotation matrix $Q$ to map from PQW to ECI is:

$$
  Q = R_3(-\Omega) R_1(-i) R_3(-\omega)
$$


Then:

$$
  \vec{r}_{\text{ECI}} = Q \cdot \vec{r}_{\text{PQW}} \quad ; \quad \vec{v}_{\text{ECI}} = Q \cdot \vec{v}_{\text{PQW}}
$$


#### Worked Example:
```python
# Constants
import numpy as np
mu = 398600  # km^3/s^2


def calculate_state_vector(a,e,i, omega, RAAN ,f):
     r = (a*(1-e**2)/(1+e*np.cos(f)))
     r_PQW = np.array([r*np.cos(f), r*np.sin(f), 0])

     h = np.sqrt(mu*a*(1-e**2))
     v_PQW = np.array([-mu/h*np.sin(f), mu/h*(e+np.cos(f)), 0])

     # Rotation matrices
     R3_W = np.array([[np.cos(RAAN), np.sin(RAAN), 0],
                      [-np.sin(RAAN), np.cos(RAAN), 0],
                      [0, 0, 1]])
     R1_i = np.array([[1, 0, 0],
                      [0, np.cos(i), np.sin(i)],
                      [0, -np.sin(i), np.cos(i)]])
     R3_omega = np.array([[np.cos(omega), np.sin(omega), 0],
                          [-np.sin(omega), np.cos(omega), 0],
                          [0, 0, 1]])
     
     # PQW to ECI transformation
     Q = np.dot(R3_omega, np.dot(R1_i, R3_W))
     r_ECI = np.dot(Q, r_PQW)
     v_ECI = np.dot(Q, v_PQW)
     return r_ECI, v_ECI
# Orbital parameters
a = 7000  # km
e = 0
i = np.radians(64)  # radians
omega = 0  # radians
RAAN = 0  # radians
f = 0  # radians
# Calculate the state vector
r_ECI, v_ECI = calculate_state_vector(a, e, i, omega, RAAN, f)
print("Position (ECI):", r_ECI)
print("Velocity (ECI):", v_ECI)


```