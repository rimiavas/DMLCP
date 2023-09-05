# Installing PyTorch

That's usually super straightforward.

First, as always, `conda activate dmlap`.

Then use the appropriate option on [this page](https://pytorch.org/get-started/locally/), for instance on Mac:

```
# CUDA is not available on MacOS, please use default package
conda install pytorch::pytorch torchvision torchaudio -c pytorch
```
