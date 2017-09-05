#!/bin/bash
DATE=`date -R`
URL=https://developer.android.com/reference/lists.js
DESTFILE=extension/android-ref.js
TEMPFILE=`mktemp`

curl -o ${TEMPFILE} ${URL}
cat <<EOT | cat - ${TEMPFILE} > ${DESTFILE}
// pulled from ${URL}
// ${DATE}
EOT
