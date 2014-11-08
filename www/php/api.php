<?php
$TBL_PREFIX = getenv('FRIENDSWIPE_TBL_PREFIX');

// Connect to the MySQL database.
$MYSQLI = new mysqli(
	getenv('FRIENDSWIPE_HOST'), getenv('FRIENDSWIPE_USER'),
	getenv('FRIENDSWIPE_PASS'), getenv('FRIENDSWIPE_DB')
);
?>