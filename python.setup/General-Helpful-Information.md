# Miscellanious but Useful

## Windows Users: Install Bash on your machine!

Bash is the command line interface running on Linux and Mac. There are many tutorials on how to install this on Windows. Send me your favourite!

It's nice.

It's nice. Do it.

## Bash users: Install the Z shell & Oh My ZSH!

The Z Shell and [Oh My ZSh](https://ohmyz.sh/) (a wrapper around the former, with lots of functionalities) are super nice and make life much easier on the terminal.

It's nice. Do it.

## What is the difference between pip and conda?

You might often come across the commands `pip install` and `conda install` when installing packages.

Pip and conda are both used to install packages but:

**Pip**
- is used *only for Python*!
- *will not check dependencies*, you can easily break things, but it's fast.

**Conda**
- is used for Python *and many other things*, for instance installing low-level GPU libraries (that means you can use pip inside conda, nice!)
- *will check every possible dependency conflict*, which can take ages if you have many things installed.
- this previous thing is one of the reasons why you are advised *never to use the `base` environment* in conda, the one that comes out of the box, as conda needs it to update itself. Just leave it untouched and create another environment straight away.

Both create environments, however pip works *project-wise*, whereas conda works *system-wise*.

## Pip

To create an environment only for a specific project:
```bash
$ cd my-project # go to that folder
$ mkdir .env # create a (usually hidden) folder for the env files
$ python3 -m venv .env --prompt my-project # creates your pip environment
$ source ./env/bin/activate                # without --prompt, my environment will be called '.env'
(my-project) $ which pip  # pip will now be in my-project/bin/pip, a local copy
```

Everything relating to this environment is contained in the `.env` folder.

To deactivate:
```bash
(my-project) $ deactivate
```

To delete all traces of your environment, start from zero, etc.
```bash
rm -rf .env # inside my-project, simply delete the folder with env files
```

### **!! NOTE: When you run python3 -m venv, it will create an environment with the same version of Python as the one used when invoking the command! To use another version, you need to have it installed, then use python3.11 -m venv...**

