// Player constructor
TRIPLET.Player = (function() {

var cfg = TRIPLET.config.general,
    rule = TRIPLET.config.rules,
    ai = TRIPLET.config.ai,
    Player;

Player = function(setup, index) {
  if (!(this instanceof Player)) return new Player(setup, index);
  this.queue = parseInt(index, 10);
  this.signID = parseInt(setup.signID, 10);
  this.name = setup.name || 'Player';
  this.color = setup.color || '000000';
  this.ai = ai[setup.ai] || ai.none;
  this.maxTurns = this.getTurnsCount(cfg.maxTurns);
};

Player.prototype = {

  constructor: TRIPLET.Player,

  getTurnsCount: function(totalTurns) {
    var endedRoundsTurns =
            ~~(totalTurns / rule.turnsPerRound) * rule.signsPerRound,
        thisRoundTurns =
            totalTurns % rule.turnsPerRound - rule.signsPerRound * this.queue;
    return endedRoundsTurns +
        Math.max(0, Math.min(rule.signsPerRound, thisRoundTurns));
  }

};

return Player;

})();