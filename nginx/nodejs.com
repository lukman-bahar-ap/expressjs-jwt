server {
    listen 8080;
    server_name localhost;

    # Tell Nginx where your app's 'public' directory is
    root /home/app/nodejs.com/public;

    sendfile on;
    client_max_body_size 30M;

    # Prevent (deny) Access to Hidden Files with Nginx
    location ~ /\. {
        access_log off;
        log_not_found off; 
        deny all;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    location / {
      proxy_pass http://localhost:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    # set the expire date to max for assets
    location ~ "^/assets/(.*/)*.*-[0-9a-f]{32}.*" {
        gzip_static on;
        expires     max;
        add_header  Cache-Control public;
    }

    error_page  405     =200 $uri;
}
