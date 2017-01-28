import maya.cmds as cmds
import json

allItems = cmds.ls()

print json.dumps(allItems)
