package Minemine::Repository::Rankings;
use strict;
use warnings;
use utf8;
use Minemine;

sub fetch {
  my ($class, $c, $limit, $offset) = @_;

  my $dbh = Minemine::handler($c)->dbh;
  my $sth = $dbh->prepare(
    "select * from rankings order by score desc limit ?, ?"
  );

  if (!( $offset =~ m/([0-9]*)/ )) { return }
  $sth->bind_param(1, $1);

  if (!( $limit =~ m/([0-9]*)/ )) { return }
  $sth->bind_param(2, $1);

  $sth->execute;
  my $ary_ref = $sth->fetchall_arrayref({});

  return $ary_ref;
}

sub create {
  my ($class, $c, $record) = @_;

  my $dbh = Minemine::handler($c)->dbh;
  my $sth = $dbh->prepare(
    "insert into rankings (
      name, comment, score, missed, sweeped, runtime, cleared_at
    ) values (?, ?, ?, ?, ?, ?, ?)");
  $DB::single = 1;
  $sth->bind_param(1, $record->{name});
  $sth->bind_param(2, $record->{comment});
  $sth->bind_param(3, $record->{score});
  $sth->bind_param(4, $record->{missed});
  $sth->bind_param(5, $record->{sweeped});
  $sth->bind_param(6, $record->{runtime});
  $sth->bind_param(7, $record->{cleared_at});
  $sth->execute;

  return $dbh->last_insert_id;
}

1;
