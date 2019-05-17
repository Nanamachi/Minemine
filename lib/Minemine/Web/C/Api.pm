package Minemine::Web::C::Api;
use JSON qw/encode_json decode_json/;
use Minemine::Repository::Rankings;

sub get_ranking{
  my ($class, $c) = @_;
  my $offset = $c->req->parameters->{offset} || "0";
  my $limit = $c->req->parameters->{limit} || "25";

  my $records_ref = Minemine::Repository::Rankings->fetch($c, $limit, $offset) or return $c->res_400_json;

  return $c->render_json({
    status => 200,
    message => 'ok',
    data => $records_ref,
  });
};

sub post_ranking {
  my ($class, $c) = @_;

  my $record = decode_json( $c->req->content )
    or return $c->res_400_json;

  $record->{cleared_at} =~ s/^([0-9]{4}-[0-9]{2}-[0-9]{2})T([0-9:]*).*$/\1 \2/;

  my $id = Minemine::Repository::Rankings->create($c, $record)
    or return $c->res_400_json;

  return $c->render_json({
    id => $id,
  });
};

1;
