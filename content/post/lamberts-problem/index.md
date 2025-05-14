---
title: "Lambert's Problem - Its Explanation and Derivation"
date: 2025-02-20T23:56:02+02:00
description: "A clear and structured explanation of Lambert's Problem in orbital mechanics, with mathematical rigor and accessibility."
tags: ["orbital mechanics", "astrodynamics","Lambert's problem"]
categories: ["Astrodynamics"]
disableComments: false
---

## Introduction

Welcome! This post aims to provide a clear and accessible explanation of Lambert's Problem in the context of orbital mechanics. My goal is to maintain mathematical rigor while ensuring that even complex concepts are explained at their most fundamental levels—eliminating any mystery behind them.

**The Core Question**

Johann Heinrich Lambert posed a fundamental problem in celestial mechanics: 

 *Given the position of a celestial body at two different points in time, can we determine its orbit?*

Stated technically, can we determine the Keplerian elements of a body in orbit using only two position vectors and the time interval between them?
Rather than diving into the historical context, let's focus directly on the mathematical foundation.

<details open>
    <summary><strong>Kepler’s Equation</strong></summary>
  A key component in solving Lambert’s Problem is Kepler’s Equation, which relates position vectors to time of flight:

  $$M = E - e\sin E  \tag{1} $$ 
    where:
    - \( M \) is the **Mean Anomaly**,
    - \( E \) is the **Eccentric Anomaly**,
    - \( e \) is the **Eccentricity**.
    
  **Mean Anomaly**: What this really means is that if we have a circular orbit(implying the rotating body travels at a constant rate) what would its angle be. The implication being that if it were an elipse it would have peroids of high and slow rotation compared to its circle counterpart.\
  [**Eccentric Anomaly**](https://en.wikipedia.org/wiki/Eccentric_anomaly): If we take an elliptic orbit and then project its True Anomaly ( position or angle \( \theta\ \)) onto a circle, what would it look like if it were a circle?\
  {{< figure src="eccentric_anamoly.png" width="350px" caption="Eccentric anomaly" >}}

  [**Eccentricity**](https://en.wikipedia.org/wiki/Orbital_eccentricity): Well this is simple how much of a circle does it look like? If its \( e = 0\) then its a circle. If 
  \( e > 0\) its now an elipse.

  <details open>
    <summary><strong> Example</strong></summary>
  Lets say we have a \( SMA = 10000km, t_1 = 0, t_2 = 2000, e = 0.2 \) what would be the true anomaly for this case?\
  Find angular frequency:

  $$ M = \sqrt{\frac{\mu}{a^3}}  (t_2 - t_1)  $$
  $$ M = \sqrt{\frac{3.98*10^{14}}{(10000*10^3)^3}}  (2000 - 0)  $$
  $$ M = 1.261 rad $$

  </details>
</details>

### The Derivation of Lamberts Equation (Not Lamberts Problem) 
Ok great now that we're introduced to Keplers equation what we're now doing to try to do is relate two points in time to their true anamoly.\

$$M = E - e\sin E $$
$$M_2 - M_1 = (E_2 - e\sin E_2) - (E_1 - e\sin E_1)  $$  
$$ \sqrt{\frac{\mu}{a^3}}  (t_2 - t_p) - (\sqrt{\frac{\mu}{a^3}}  (t_1 - t_p)) = (E_2 - e\sin E_2) - (E_1 - e\sin E_1)  $$  
$$ \sqrt{\frac{\mu}{a^3}}  (t_2 - t_1) - \cancel{t_p} + \cancel{t_p} = (E_2 - e\sin E_2) - (E_1 - e\sin E_1) $$

Good now do we see what we did here ? Essentially we took Keplers equation and then solved that the time of flight would be between two distinct points here. (Albeieit it in terms of E but from that we can get the True Anamoly)

This now is what we're looking for in essence, We have successfully related the time of flight to the transfer elipse using the Mean Eccentricity of the two points and then all we really have to solve for now is the Semi Major Axis.\
The issue comes when we dont have access to the Mean Eccentricity what do we do?\
Well we need to find another way to actually connect this realtionship, but realistically speaking this will serve as the backbone for our proof moving forward.

#### Finding a realtionship between Mean Eccentricity and its Radius
Luckly for us we get the following relationship:
$$ r =  \frac{a (1 - e^2) }{1 + e\cos f} = a(1- e\cos E ) $$
We're going to skip the proof of this, but for a detailed explanation, refer to: *Prussing, J. E., & Conway, B. A. (2013). *Orbital Mechanics* (2nd ed.). Oxford University Press. Section 2.2: "Position and Time in an Elliptic Orbit," p. 28.*


So now that we have a direct time of flight we will relate this to Labmert's equation:

$$ \sqrt{\frac{\mu}{a^3}}  (t_2 - t_1) = (E_2 - e\sin E_2) - (E_1 - e\sin E_1) $$
$$ \sqrt{\frac{\mu}{a^3}}  (t_2 - t_1) = (\cos^{-1}(\frac{a - r_2}{ae}) - e\sin (\cos^{-1}(\frac{a - r_2}{ae})) - (\cos^{-1}(\frac{a - r_1}{ae}) - e\sin (\cos^{-1}(\frac{a - r_1}{ae})) $$

Technically speaking we can stop here, we have a transcendental equation, but we take a powerful computer and just solve the equation given our initial conditions and see what solution we get but this is not pratical really.\
The real way to go about solving this then... Begin! 

#### Geometric relationship to constrain the formulation of Lambert's problem:
{{< figure src="Geometric_Property_of_Elipses.png" width="350px" caption="Figure 2: Geometric Property of Ellipses" >}}

Now what we have here is a potiential transfer orbit which involves two points P1 and P2. The main focus if we can call it that is the original focus point between which the satellite orbits( Imagine earth ) the interesting thing to note is the secondary focus point - the vacant focus.\
Remember it is this vacant focus which we're interested in because through knowing its position we actually find the SMA of the orbit. So lets look at this graph and see what we can find out. Most notibially its the relationship that the summed distance between any point say P1 and the distance to the focus and its vacant focus is 2a.\
Said in more concrete terms: If I take the distance between P1 and the Focus (F) and **SUM** it with the distance from P1 and the vacant focus (F`) I will get 2a

$$ P_1F + P_1F` = 2a $$
$$ r_1 + (2a - r_1 ) = 2a $$
A simple example of this is the following:
{{< figure src="Geometric_Proof_of_Elipses.png" width="550px" caption="Figure 3: Geometric Proof of Ellipses, Here we see through design programs that if we add up the two vectors pointing to each of the Focuses then what we find is that its equal to 2a" >}} 

{{< figure src="Search_for_SMA.png" width="550px" caption="Figure 4: Search for SMA, now something interesting occures here as we varry the radius around the points we generate two circles. These two circles intersect at different places" >}}

The points where these circles intersect really are the place where the secondary focus exists! That being said at each intersection point we have a solution to the transfer orbit. Note (because if we place a focus there and then create an elipse we pass through P1 and P2)
Now if we think ok, if at everypoint we have a contact between the two circles we have some kind of a transfer orbit then what occures when we only have a contact at one point? 
Well at that point really we have a minmum transfer orbit in terms of energy, this transfer orbit will lie one the line between P1 and P2 as seen below:

{{< figure src="Optomal_Energy_Transfer.png" width="550px" caption="Figure 5: Optimal Energy Transfer" >}}

Note this does not mean it requires the least amount of time but the least amount of energy, its also worth noting that the most effieicnt transfer between two points is a circular one. So then given the constraints of our point the orbit which has the most circular orbit which still satasfies by being in the primary focus, P1 and P2 is the most efficient.

We will now discuss why the vacant focus will lie on the line between P1 and P2 and how its calculates

<details open>
    <summary><strong> Finding The Minimum Transfer</strong></summary>

  Explination why the vacant focus will lie on the cord length P1 and P2

  </details>
</details>



