# Sound Sampling: Creating a Sound of a Certain Frequency Programmatically

**date:** `2025-09-07` `4:00` `UTC+5:30`  
**tags:** `math` `physics` `audio`

I am a sine wave.  
I am continuous.  
I repeat every 2π time interval.

And I can help you create music.

Let's produce the sound Note A (440 hz) which plays for 2 seconds.

## What do we mean by a sound of frequency 440 Hz?

It's air particles moving back and forth around an equilibrium point due to pressure variations. If this back and forth happens 440 times in one second, we say it has a **frequency of 440 Hz**.

Our ears have complex machinery to sense this back and forth motion and our mind invents (hallucinates) the sensation of sound.

Intuitively:  
- Higher frequency -> Higher pitch (sharper sound)
- Lower frequency -> Lower pitch (smoother sound)

## A Computer and a Pressure Difference Generator

we need a device which can create this back and forth disturbance in air through pressure differences. Luckily, we have those all around us such as speakers in our phones and laptops.

## The Methodology

A back and forth repeating pattern can be described using a function that is periodic. One of these functions that we can use is sine.

We can represent a sound wave with an equation involving sine function,

$$Y = A \sin\left(2 \pi f t\right)$$

where,
  - $A =$ Amplitude (loudness)
  - $f =$ Frequency (cycles per second, Hz)
  - $t =$ Time (seconds)

we multiply the period by frequency $f$ to include all the $f * t$ cycles.

We need some additional concepts to actually be able to have all the points on Y axis across all the $f * t$ cycles. As computers are digital machines and work on discrete points instead of continuous, we introduce a concept "sample rate" (s) to represent the number of points on time axis per second.

One commonly used value for sample rate is 44100, which is the standard sampling frequency for audio CDs. Let's define,

sample rate (s) = 44,100

We can write equation, 

$$
y[n] = \sin\left( 2 \pi f \frac{n}{F_s} \right), \quad n = 0, 1, 2, \dots, N-1
$$
$$
\text{where, } F_s = 44,100; N = 2 \cdot F_s = 88,200
$$


Now, we can have Y for all the 44,100 values of time axis for each second. This can be done by following code snippet (C++):

**Imports**

sfml for playing audio samples, and Int16 type.  

```cpp
#include <SFML/Audio.hpp>
#include <cmath>
#include <map>
#include <string>
#include <vector>
```

**Function to produce sound for params: frequency and duration**

```cpp
int playNote(double frequency, double duration) {
  const unsigned SAMPLE_RATE = 44100;
  const double AMPLITUDE = 0.5;
  duration = 0.4;

  std::vector<sf::Int16> samples;
  samples.reserve(SAMPLE_RATE * duration);

  // Generate sine wave samples
  for (unsigned i = 0; i < SAMPLE_RATE * duration; i++) {
    double t = static_cast<double>(i) / SAMPLE_RATE;
    double value = AMPLITUDE * std::sin(2 * M_PI * frequency * t) * 32767;
    samples.push_back(static_cast<sf::Int16>(value));
  }

  // Load into SFML sound buffer
  sf::SoundBuffer buffer;
  if (!buffer.loadFromSamples(samples.data(), samples.size(), 1, SAMPLE_RATE)) {
    return -1;
  }

  // Play the sound
  sf::Sound sound;
  sound.setBuffer(buffer);
  sound.play();

  // Keep program alive until sound ends
  sf::sleep(sf::seconds(duration));
  return 0;
}
```

**graph: sine wave sampled at 44.1 kHz**

![Sine Wave Sampled](/assets/images/sine-wave-sampled)

And there we have, a somewhat repeating/oscillating values for 88,200 points, and so what our ear detects is the speed of oscillation and the sound we hear is interpretation of that motion.

Call it a hallucination of mind if you will (though a shared one).