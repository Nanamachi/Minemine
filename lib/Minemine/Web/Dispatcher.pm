package Minemine::Web::Dispatcher;
use strict;
use warnings;
use utf8;
use Amon2::Web::Dispatcher::RouterBoom;
use Minemine::Web::C::Api;

base 'Minemine::Web::C';

get '/api/' => 'Api#get_ranking';
post '/api/' => 'Api#post_ranking';

1;
