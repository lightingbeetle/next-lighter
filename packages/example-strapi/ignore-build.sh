#!/bin/bash

# Vercel is skipping build & deploys if exit code 0 is returned from ignore script

# We want to skip build & deploys if fronted code was not changed
# We want to skip build & deploy if backend changed, because there could be 
# race condition if frontend starts to build sooner then backend -> so it's 
# safer to leave there old deploy and deploy new code manually when backend is
# ready (this could be automated with Render.com deploy hooks).

git diff HEAD\^ HEAD --quiet ./packages/example-strapi/frontend
FRONTEND_CHANGED=$?

git diff HEAD\^ HEAD --quiet ./packages/example-strapi/backend
BACKEND_CHANGED=$?

echo $FRONTEND_CHANGED
echo $BACKEND_CHANGED

if [[ $BACKEND_CHANGED -eq 1 ]] ; then
  echo 'Backend changed -> SKIP BUILD & DEPLOY'
  exit 0
fi

if [[ $FRONTEND_CHANGED -eq 1 ]] ; then
  echo 'Frontend changed -> BUILD & DEPLOY'
  exit 1
fi

echo 'Frontend or backend not changed -> SKIP BUILD & DEPLOY'

exit 0
