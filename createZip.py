#!/usr/bin/env python
import os
import zipfile
from shutil import copytree, ignore_patterns, rmtree, copy

destination  = 'dist/client/stemapp/widgets/awsdk-search'
include = ['css', 'images', 'js', 'nls', 'setting']
includeFiles = ['Widget.html', 'Widget.js', 'config.json', 'manifest.json']
def copyFiles():
	for folder in include:
		copytree(folder, os.path.join(destination, folder), ignore=ignore_patterns('.DS_Store'))
	for file in includeFiles:
		copy(file, os.path.join(destination, file))

def zipdir(path, zip):
	for root, dirs, files in os.walk(path):
		if '.DS_Store' in files:
			files.remove('.DS_Store')
		for file in files:
			print file
			zip.write(os.path.join(root, file))

if __name__ == '__main__':

	copyFiles()
	zipf = zipfile.ZipFile('awsdk-install.zip', 'w')
	zipdir('dist/client', zipf)
	zipf.close()
	if os.path.exists(destination):
		rmtree(destination)
