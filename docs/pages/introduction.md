## Introduction

Ngext is a tool which abstracts an angular application and drastically simplifies the routing. It has the following features: 

- File-based routing (no more routing modules!)
- All lazy loaded modules generation
- Dynamic configurations (no more static angular.json files)
- Declarative route layouts
- Server-side rendering, (HTML file for each page!)
- Compatible with all angular concepts `@NgModules`, `@Components`, ...etc

## Why use this?

Angular has many elegant abstractions, `@Component`, `@Module`, `@Injectable`. However, the routing in Angular is not a simple abstraction.

In order to add a new page, Angular routing requires that you edit 3 places; add a component file, declare component in a module, and add a route to a routing module.

![comparison](/imgs/ngext-comparison.png)

This project attempts to encapsulate this into a single abstraction `@PageComponent`, which contains the component, dependencies and the route path which is generated from the page location. Making it easier than ever to add new pages to Angular apps.
