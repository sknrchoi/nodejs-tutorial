var db = require('./db');
var bcrypt = require('bcrypt');
var shortid = require('shortid');

module.exports = function(app) {
    // Passport Load (It should be done after session initialize.)
    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    // Set passport middleware in Express version 4.x
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
        }, 
        (email, password, done) => {
            console.log('[info] LocalStrategy : ', email, password);

            db.query(`SELECT * FROM users WHERE email=?`, [email], (error, user) => {
                
                if (error) {
                    done(error);
                }
                
                if (user.length > 0) {
                    bcrypt.compare(password, user[0].password, (err, result) => {
                        if (result) {
                            done(null, user[0], {
                                message : 'Welcome..'
                            });
                        } else {
                            done(null, false, {
                                message : 'Password is not correct.'
                            });
                        }
                    })
                    
                } else {
                    done(null, false, {
                        message : 'There is no eamil.'
                    });
                }
            });
        })
    );
    
    // Use the GoogleStrategy within Passport.
    // Strategies in Passport require a `verify` function, which accept
    // credentials (in this case, an accessToken, refreshToken, and Google
    // profile), and invoke a callback with a user object.
    var googleCredentials = require('../config/google.auth.json');
    passport.use(new GoogleStrategy({
        clientID: googleCredentials.web.client_id,
        clientSecret: googleCredentials.web.client_secret,
        callbackURL: googleCredentials.web.redirect_uris[0]
      },
      function(accessToken, refreshToken, profile, done) {
          console.log("GoogleStrategy = ", accessToken, refreshToken, profile);
          
          var email = profile.emails[0].value;
          db.query(`SELECT * FROM users WHERE email=?`, [email], (error, user) => {
            if (error) {
                done(error);
            }
            
            if (user.length > 0) {
                done(null, user[0]);
            } else {
                var user = {
                    id : shortid.generate(),
                    password : "",
                    email : email,
                    nickname : profile.displayName,
                }
                db.query(`INSERT INTO users set ?`, user, (error, result) => {
                    if(error) {
                        throw error;
                    }

                    done(null, user);
                });
            }
        });
      }
    ));

    // Save user info to session when user login sucess
    passport.serializeUser((user, done) => {
        // user argument is returned value at LocalStrategy authentication function
        console.log('[info] serializeUser', user);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        
        db.query(`SELECT * FROM users WHERE id=?`, [id], (error, user) => {
            if (error) {
                done(error);
            }

            console.log('[info] deserializeUser', id, user);

            if (user.length > 0 ) {
                done(null, user[0]);
            } else {
                done(null, false, {message: 'User not exist'});
            }
        });
    });

    return passport;
}