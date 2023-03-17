const utils = require('./utils');

// let pool = jan.getPool();//todo

var navUtil = {
    sidebar_links: [
        // {link: '/', icon: '<i class="nc-icon nc-bank"></i>', text: 'App Home'},
        // {link: '/admin/', icon: '<i class="nc-icon nc-diamond"></i>', text: 'Admin Dashboard', active: true},
        // {
        //     link: '/admin/toolbox',
        //     icon: '<i class="nc-icon nc-settings"></i>',
        //     text: 'Toolbox',
        //     links: [
        //         {link: 'javascript:addUser();', icon: '<span class="sidebar-mini-icon">AU</span>', text: 'Add User'},
        //         {
        //             link: 'javascript:deleteUser();',
        //             icon: '<span class="sidebar-mini-icon">DU</span>',
        //             text: 'Delete User'
        //         },
        //     ]
        // },
        {link: '/', icon: '<i class="nc-icon nc-bank"></i>', text: 'Home Page'},
        {link: '/pointcloud/dashboard', icon: '<i class="nc-icon nc-diamond"></i>', text: 'Dashboard', active: true},
        {link: '/pointcloud/map', icon: '<i class="nc-icon nc-world-2"></i>', text: 'Map Management',},
        {link: '/pointcloud/projects', icon: '<i class="nc-icon nc-spaceship"></i>', text: 'Project Ship',},
        {link: '/login', icon: '<i class="nc-icon nc-single-02"></i>', text: 'Login',},

    ],
    getPointcloudLinks() {

        return [
            {
                link: '/pointcloud/dashboard',
                icon: '<i class="nc-icon nc-diamond"></i>',
                text: 'Dashboard',
                active: true
            },
            {link: '/pointcloud/map', icon: '<i class="nc-icon nc-world-2"></i>', text: 'Map Management',},
            {link: '/pointcloud/projects', icon: '<i class="nc-icon nc-spaceship"></i>', text: 'Project Ship',},
        ]
    }
    ,
    /**
     * Given a list of com resources names this function should return the config for nav sidebar that would make those coms buttons
     *
     * @param coms - an array of link objects (link, icon, text, links, mode)
     *      if links is an array then a dropdown is made by default
     *      set to mode btnGroup/ comsIcons/ dropdown / radialHover / replaceIcons
     */
    getComsLinks(coms) {
        //todo options.collapse


        coms = coms || ['users', 'groups', 'clients', 'assets', 'shares']

        let comsMapping = {
            'users': 'users',
            'groups': 'projects',
            'clients': 'clients',
            'samcart_orders': 'assets',
            'wordx': 'shares'
        }
        let comsIconMapping = {
            'users': '<i class="nc-icon nc-single-02"></i>',
            'groups': '<i class="nc-icon nc-box-2"></i>',
            'clients': '<i class="nc-icon nc-shop"></i>',
            'assets': '<i class="nc-icon nc-basket"></i>',
            'shares': '<i class="nc-icon nc-send"></i>',
        }
        console.assert(Array.isArray(coms))
        coms.map(x => {
            if (comsMapping[x]) return comsMapping[x]
            else return x
        })

        let links = coms.map(x => {

            let nn = x;
            nn[0] = nn[0].toUpperCase();

            return {
                link: '/coms/' + x, icon: comsIconMapping[x], text: nn,
                mode: 'comsIcons',//ok now we have constructed a tree but we need to indicate that we want a different type of menu to our nav modules.
                links: [
                    {link: '/coms/' + x + '/create/', icon: '<i class="nc-icon nc-simple-add"></i>', text: 'Create',},
                    {link: '/coms/' + x + '/overview/', icon: '<i class="nc-icon nc-world-2"></i>', text: 'Overview',},
                    {link: '/coms/' + x + '/manage/', icon: '<i class="nc-icon nc-ruler-pencil"></i>', text: 'Manage',},
                    {link: '/coms/' + x + '/share/', icon: '<i class="nc-icon nc-send"></i>', text: 'Share',}
                ]
            }

        });

        return links;

    },
    getUsersSidebarLinks(user) {
        //todo check for all coms user has access to based on permissions

        let allLinks = [...navUtil.sidebar_links, ...navUtil.getComsLinks()];
        return allLinks;


    },
    getAllLinks() {
        let allLinks = [...navUtil.sidebar_links, ...navUtil.getComsLinks()];
        return allLinks;
    }

}

navUtil.all_links = navUtil.getAllLinks();

module.exports = navUtil;
