#!/bin/sh
git checkout gh-pages
git merge -s subtree master
#git rebase master
git checkout master