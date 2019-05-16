package Minemine::DB::Schema;
use strict;
use warnings;
use utf8;

use Teng::Schema::Declare;

base_row_class 'Minemine::DB::Row';

table {
    name 'rankings';
    pk 'id';
    columns qw(id name comment score missed sweeped runtime cleared_at);
};

1;
