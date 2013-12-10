/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
angular.module('fantasyApp.services.leagues', ['fantasyApp.services.firebaseRefs'])
    .factory('Leagues', ['angularFireCollection', 'FireRef',
        function(angularFireCollection, FireRef) {
            return {
                collection: function(cb) {
                    return angularFireCollection(FireRef.leagues(),cb);
                }
                , find: function(leagueId) {
                    return FireRef.leagues().child('/'+leagueId);
                }
                , create: function(league, commissioner, cb) {
                    return FireRef.leagues().push({
                        name: league.name,
                        commissionerId: commissioner.id,
                        fantasyTeams: []
                    }, cb).name();
                }
                , removeLeague: function(leagueId) {
                    var league = FireRef.leagues().child('/'+leagueId)
                    league.remove();
                }
            }
        }])