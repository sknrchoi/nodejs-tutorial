var db = require('./db');
var bcrypt = require('bcrypt');

module.exports = function(app) {
    // Passport Load (It should be done after session initialize.)
    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

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