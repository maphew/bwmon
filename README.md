##Bandwidth Usage Monitor

A simple shell script designed to run on linux powered routers

![Sample Usage by User Screenshot](https://github.com/VREMSoftwareDevelopment/bwmon/raw/master/screenshots/UsageByUserData.jpg "Sample Usage by User Screenshot")

[Try a demo version of this application](https://vremsoftwaredevelopment.github.io/bwmon/demo)

###Software Features:
- Designed to run on linux based routers such as: [Tomato](https://en.wikipedia.org/wiki/Tomato_firmware), [OpenWrt](https://en.wikipedia.org/wiki/OpenWrt), [DD-WRT](https://en.wikipedia.org/wiki/DD-WRT), etc
- Provides per user bandwidth usage monitoring
- Generates bandwidth usage reports per user/month/year

###Technical Features:
- Shell script to collect bandwidth usage and to generate JSON data structure.
- Web Based GUI to display bandwidth usage
- Web Based GUI is using Bootstrap and AngularJS

##*Installation instructions:*
- Make sure that you have a harddisk or USB flash drive attached to router and it is formated and mounted.
- Log into your router via *ssh*.
- To install application type the following command in *ssh* terminal:
	- `cd /mnt/<mounted_name>/`
	- `mkdir bwmon`
	- `cd bwmon`
	- `wget https://github.com/VREMSoftwareDevelopment/bwmon/releases/download/v2.3.4/bwmon.tar.gz`
	- `tar -xzvf bwmon.tar.gz`
	- `chmod +x *.sh`
	- `./bwmon-cron.sh install`
- Visit `http://<your_router_ip>/user/bwmon/index.html` to view bandwidth usage statistics.
- To setup bandwidth usage monitor to start automatically after router reboots add the following to autostart script on mount: `./mnt/<mounted_ name>/bwmon/bwmon-cron.sh install`

###Usage:
`./bwmon-cron.sh {install|remove}` - shell script to install or remove bandwidth usage monitor from cron jobs

######Note:
- Problem using `wget`:
	- *error getting response: Connection reset by peer* - add the following option `--no-check-certificate`
	- Or download the file from the web-site and copy to the folder.

##*Configuration*
`{install_dir}/macnames` - CSV lookup file of Machine network card addresses to Computer names

    E8:50:8B:DF:EE:FE,A-phone
    00:1B:FC:44:AC:42,dell-laptop
    00:27:09:F2:26:F4,Wii
    BC:5F:F4:E9:FC:10,server
    88:53:95:8B:1F:92,iPhone-2


##*Build Instructions:*
- Install NodeJS
- Install Gulp and Bower: `npm install -g gulp bower`
- Create project: `git clone https://github.com/VREMSoftwareDevelopment/bwmon.git`
- Install required node modules: `npm install`
- Install required bower components: `bower install`
- Build application: `gulp`

###Gulp tasks:
- `gulp` - places a fully optimized application (production ready) in `/dist`
- `gulp build`  - same as `gulp`
- `gulp webserver` - runs a server using production ready application with sample data on `http://localhost:8080`
- `gulp test` - runs local unit tests
- `gulp testauto` - runs local unit tests in continuous integration mode
- `gulp e2e` - runs local e2e tests
- `gulp coverage` - creates unit test coverage report in `/logs/PhantomJS...`
- `gulp devwebserver` - runs a server using development ready application with sample data on `http://localhost:8080/app`

[See code coverage](https://vremsoftwaredevelopment.github.io/bwmon/coverage)

