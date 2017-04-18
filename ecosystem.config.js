var user = encodeURIComponent(process.env.GITHUB_USER);
var password = encodeURIComponent(process.env.GITHUB_PASSWORD);
var keyPath = process.env.SSH_PRIVATE_KEY_PATH || "~/.ssh/id_rsa";

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "hello-world",
      script    : "npm",
      args      : "start",
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: 8994
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      "key"  : keyPath,
      "user" : "ichiwa",
      "host" : [process.env.HOST],
      "ref"  : "origin/master",
      "repo" : "https://"+user+":"+password+"@github.com/ichiwa/hello-world-pm2-wercker.git",
      "ssh_options" : "StrictHostKeyChecking=no",
      "path" : "/home/ichiwa/hello-world-pm2-wercker",
      "post-setup" : "npm install",
      "post-deploy" : "pm2 restart ecosystem.config.js --env production"
    }
  }
};
