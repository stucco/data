stucco-data
===========

**Enumeration of data sources that can be used to provide context to security events**

This repository keeps a list of the data sources that are potentially relevant to cyber security and the source for the [web site](http://ornl-visual-analytics.github.com/stucco-data/) to make the data sources easy to read.

## Data sources Format

Data sources are enumerated as a JSON array. Data source files are read from the `data` directory. The format for each data source is:

    {
      "name": "required name of the data source"
    , "url": "optional URL to download data from"
    , "type": "optional type [web, Atom, RSS, API]"
    , "info": "optional URL to find out more information"
    , "description": "optional description about the data source"
    , "categories": ["optional array of categories for the data source"]
    }

## Usage

You will need to have [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) installed globally:  `npm install -g grunt-cli`.

To check the JSON file, run

    grunt test

There is a [git pre-commit hook](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) that will use grunt to validate the `source.json` file. To use it, create a symlink:
    
    ln -s ../../pre-commit.sh .git/hooks/pre-commit

To build the `deploy` directory, just run

    grunt

To deploy to [GitHub pages](http://pages.github.com/), run

    grunt deploy
