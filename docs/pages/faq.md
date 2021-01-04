# FAQ

## Why did you make this?

Angular is verbose. It's a sad fact that many beginners discover and experts forget. After using Angular for a few years now (in my day job) it's shown a few points:

Angular's ***Strengths***
- Automatic dependency injection
- Separation of concerns, Services, Components and Modules
- Component event-driven Outputs

Angular's ***Weaknesses***
- Routing is verbose and redundant in many cases
- Module's can use parent Module's services/components, making implicit dependencies 
- The [angular-cli](https://github.com/angular/angular-cli), don't get me started, code generation that users need to edit is a false economy
- Configuration `angular.json` quickly becomes a fragile JSON file 30 levels deep! it's insane, static and outdated! `webpack.config.js` is a much better abstraction and can have logic inside it...

**Fixing the Routing Complexity**
The routing in Angular has always annoyed me personally. It's verbose, complex and redundant. Most applications can get away with a *subset* of Angular's routing capabilities, which are:

- 1 to 1 relationship between Page Components and Routes
  - Every path has it's own page file
  - This makes it simpler to determine problems and generate the code
- Route path should be generated from the filesystem path of the Page Component
  - If each Page is at a single file location, then the route can be *generated* from that location

Reducing the application routing to these constraints, makes generating the boilerplate *much easier* and applications much simpler to understand. It's even closer to the way older websites used to work!

## But why Angular?

Despite what Angular says, their product is optimised as an entrpise solution *(This is why it was chosen at the company I work for)*. This has led to an advanced framework which has a lot of useful but **complicated** features built-in. In this case *Advanced* means annoying, difficult to use and hard to understand.

After using it for the past few years, it seems the community has stagnated and almost become resentful. Nobody *wants* to use it for they're own projects, nobody's developing better libraries for it...  

<img width="600" src="https://i.imgur.com/8RmBr4A.png" />

*Source: [Stack Overflow Developer Survey](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-platforms-loved5)*

It's even a meme to dislike Angular now, just see [Ben Awad's](https://www.youtube.com/watch?v=Hfr-e13av5I) video (he's great by the way).

It's been *even more frustrating* after trying [next.js](https://nextjs.org/) and [nuxt.js](https://nuxtjs.org/) and seeing how easy and elegant generating webapps can be, once routing is easier.

Basically, Angular routing sucks, but I have to use it at work, so I made this to help. Hopefully it helps someone else too.

## How?

**Initial design**

I initially wanted to insert my own typescript transformer plugin into the webpack build pipeline. Like this: 

![image](https://user-images.githubusercontent.com/11782590/98644457-6576c280-2380-11eb-9965-d3cbd8e3db09.png)

This transformer would convert my own type of decorators and generate **_angular_** decorators (`@NgModule` and `@Component`), and pass it to the angular compiler, which will proceed with the rest of the build. Like this:

![image](https://user-images.githubusercontent.com/11782590/98645351-bcc96280-2381-11eb-8966-cb249249f1ea.png)

But this was deemed impossible with the current compiler as it doesn't obey the rules of webpack ([more details here](https://github.com/angular/angular-cli/issues/19328)) 

**Final design**

This project uses a 2 stage build system. Stage 1 translates the `ngext` Components into standard Angular `@NgModule`'s and `@Components`. Stage 2 generates the application, like a normal angular application.

This was actually easier and had greater flexibility and speed in development. It also meant I got to make a cool CLI tool like nextjs!
