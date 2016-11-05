#!/bin/sh

# Set files permissions into the JQuery archive
# Re-pack them to tar.bz2
# 
# Copy new "jquery-ui-*.custom.zip" here and run script

error() {
	[ -z "$1" ] || echo "$1"
	exit 1
}

[ -f jquery-ui-*.custom.zip ] || error "JQuery-UI zip not found!"

JQZIP=$(ls jquery-ui-*.custom.zip)
JQDIR=${JQZIP%.zip}

unzip "$JQZIP" || error "Unzip error"
[ -d "${JQDIR}" ] || error "Archive error"

[ -f "${JQZIP}" ] && mv "${JQZIP}" "${JQZIP}.old"
[ -f "${JQDIR}.tar.bz2" ] && mv "${JQDIR}.tar.bz2" "${JQDIR}.tar.bz2.old"

chmod -R 777 "${JQDIR}"
tar cjf "${JQDIR}.tar.bz2" "${JQDIR}" && rm -rf "${JQDIR}"

