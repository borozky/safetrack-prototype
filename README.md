# Safetrac Admin prototype

Author: Joshua Orozco <[joshua.b.orozco@gmail.com](mailto:joshua.b.orozco@gmail.com)>

## Uses
* Laravel mix
* HTML5 boilerplate
* Bootstrap 4 & jQuery


## Development setup
Make sure npm and PHP are available in your PATH. We'll use PHP to serve the project files
```powershell
# Serve project files and make it available on network.
# This has to be 0.0.0.0 instead of localhost 
# or else browsersync in laravel-mix will not work!
php -S 0.0.0.0:8000 -t ./   
```

In another terminal
```Powershell
npm install
npm run watch
```

