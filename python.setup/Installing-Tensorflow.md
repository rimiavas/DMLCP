# Installing Tensorflow/Keras

TensorFlow has been notoriously annoying to install.

It is always good to check the latest [instructions on their website](https://www.tensorflow.org/install/pip).

## Option A: If you are an M1 Mac user:

If this is your first time using tensorflow, you need to follow these instructions:

1. Open a terminal window
2. Activate your conda environment, e.g. by typing `conda activate dmlap`
3. Install tensorflow dependencies for Mac by typing `conda install -c apple tensorflow-deps`
4. Install the Mac OS version of tensorflow by typing `python -m pip install tensorflow-macos==2.9`
5. Install tensorflow-metal by typing `python -m pip install tensorflow-metal==0.5.0`
6. Then open a new terminal. In there, the dependencies should be available, and you can launch a new notebook using the `jupyter notebook` or `jupyter lab` command

Then continue on where it says "Everyone Continue here".

## Option B: If you are NOT an M1 Mac user:

Run `!pip install tensorflow` in the cell below or `pip install tensorflow` in the terminal.

```python
!pip install tensorflow
```
