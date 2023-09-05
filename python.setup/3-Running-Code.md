# Running code on Jupyter and Google Colab

The [Jupyter Notebook](https://jupyter.org) is a web interface for creating and sharing computational documents. It offers a simple, streamlined, document-centric experience and supports over 40 programming languages, including Python.

[Google Colab](https://colab.research.google.com) is a product from Google Research that allows you to write and execute python code through the browser, and is especially well suited to machine learning.

## Jupyter vs Google Colab

Jupyter Notebooks run off the cloud. They use your local hardware and require from you to install packages locally (in your conda environment). On the other hand, Google Colab runs on the cloud. It gives you access to GPUs on virtual machines (often not without a cost) and requires from you to re-install packages for each session. Google Colab is much more straight-forward to use because it does not require the whole package configuration process that otherwise you need to do when running things locally. 

In this module, we introduce Google Colab but we also encourage you to have a working local setup using Anaconda/Miniconda/Miniforge because this will give you more flexibility as well as useful practice working with these tools on your own machine.

## Running Jupyter Notebooks

Use the terminal/console and type:
- `conda activate dmlap` (or the correct name of your environment if you did not call it dmlap)
- `jupyter notebook` or `jupyter lab`

Then use the file explorer that opens in the browser to locate your iPython notebooks (explained below).

You have now launched the Jupyter Notebook programme from your terminal, and it has opened in the browser at localhost:8888. It is important to understand that the programme is running in the terminal, and we have a view of it through the browser. This client – server set up means that if we close the browser, the notebook doesn’t close. 

## Running Google Colab

- Open [Google Colab](https://colab.research.google.com)
- Select the option "Upload" from the window that pops up or go to (File --> Upload notebook), then drag and drop in your (downloaded) iPython notebook

It is as simple as that. You don't need to install anything to use Google Colab. When you start working with it, you will notice that it is quite useful to connect it to your Google Drive to allow it to read and write files instead of re-uploading your data every time you start a new colab session.

### **!! NOTE: Never forget to check the _Runtime_ (CPU/GPU/TPU) in `Runtime → Runtime Type`**

## Getting the iPython code (.ipynb) from GitHub

The iPython code for this module will be found in [this repository](https://github.com/jchwenger/DMLAP) on [GitHub](https://github.com).

The easiest way to get the code everytime we update the repository is to use the Github App.

Getting the App:
- https://desktop.github.com/
- Download the app
- Install the app
- Make sure you're signed in, for instance with GitHub using your username and password
- Browser opens -> Authorise -> Same username and password

Cloning the Repo:
- Go to [repo](https://github.com/jchwenger/DMLAP)
- Click Clone or Download
- Open in App
- Choose an install location on your computer (by default this is a Github folder in your Documents)

Getting updates in the App:
- Click Fetch origin
- Click Pull origin

You can also do that in the terminal:

```bash
$ git clone https://github.com/jchwenger/DMLAP
$ cd DMLAP # voilà
$ git:(main) # if you have oh my zsh, the branch will appear on the left in some form
```

### A note on the GIT workflow

It is **highly** recommended, when working with a repo, that you create a separate *branch*, for instance `dev`, and do your work on this branch, commit things, etc. Then, you can pull new changes from the `upstream` branch (mine) without difficulty in your `master` branch. 

In the terminal, right after you cloned:

```bash
$ git:(main) git checkout -b dev # creates a branch dev and checkout ('moves') into it
$ git:(dev) 
$ git:(dev) git checkout main # to come back (this will work *only* if your changes are committed or stashed)
$ git:(main) # here you can pull
```

### Highly recommended: Git & GitHub for Poets

Learn more about [Git and GitHub with Dan Shiffman](https://www.youtube.com/watch?v=BCQHnlnPusY&list=PLRqwX-V7Uu6ZF9C0YMKuns9sLDzK6zoiV).
