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
      name      : 'hello-world',
      script    : "npm",
      args      : "start",
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      "key"  : keyPath,
      "user" : "user",
      "host" : [HOST],
      "ref"  : "origin/master",
      "repo" : "https://"+user+":"+password+"@github.com/<REPOSITORY>",
      "ssh_options" : "StrictHostKeyChecking=no",
      "path" : "/home/user",
      "post-setup" : "npm install",
      "post-deploy" : ". ~/.profile && pm2 reload ecosystem.config.js --env production"
    }
  }
};
