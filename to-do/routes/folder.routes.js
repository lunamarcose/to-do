const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folder.controller');

router.get('/', folderController.getFolders);
router.post('/', folderController.postFolder);
router.get('/:folderId', folderController.getFolder);
router.delete('/:folderId', folderController.deleteFolder);

module.exports = router;
