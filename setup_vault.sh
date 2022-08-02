#!/bin/bash
cp ./hooks/post-merge ./.git/hooks/post-merge
/bin/sh ./.git/hooks/post-merge
