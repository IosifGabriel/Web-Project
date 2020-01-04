# Push to Git (CLI)

[![Greenkeeper badge](https://badges.greenkeeper.io/bjesuiter/push-to-git.svg)](https://greenkeeper.io/)

This CLI tool is intended to be able to easily push the current branch to some target git repository or branch for deployment. 
This is useful for services like resin.io, where pushing code to their git repository is the only way of deploying your app. 

This could also be used for DevOps situations where you have 3 branches 'production', 'staging', and 'testing' for example. 
Normally you would have to 
* check out the desired deploy target branch, 
* merge your current working branch / feature / bugfix / etc. into it, 
* push the deploy target branch and 
* check back into your working branch to continue work. 

This script simplifies this action (for example pushing your current branch to the testing slot) to  
`push-to-git --target origin --branch testing`  
And if you use this cli tool in npm scripts, you can make these deployments even simpler!


## Usage

```

  Usage: push-to-git [options]

  Options:

    -v, --version         output the version number
    -t --target <target>  Git Target to push to, this can be a full git address or a registered git remote name
    -b --branch <branch>  Target branch name to push to, defaults to the same name like input branch
    -e --extra <extra>    A string value with extra git options which should be used
    -m --master           Sets the target branch to master per default
    -d --dry-run          Emulates the upload - useful for checking input params
    -p --production       Sets the production flag which triggers additional checks when uploading
    -f --force            Forces git push
    -h, --help            output usage information

  General Information: 
        Version: 1.0.0
        Purpose: Pushes the current branch to an arbitrary branch 
                 in the same or in another repository for deployment.

```

## Credits
Package created after  
 https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
