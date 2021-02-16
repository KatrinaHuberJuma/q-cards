
### General notes:
  - use more useEffect. While it doesn't matter for our small app, it will add up in large apps and result in much sadness and refactoring. Better to develop good habits while you're young before committing to a life of crime
  - logic only cares whether it's right when a component it's in is getting rendered, but it's pretty common for components to get rendered and then render something else
    - example: in our `main` component, we originally had a staff view and a student view. Student view continued to log an error even when we logged in as staff. Possibly the student view was being rendered briefly 

  - more helper functions! 
    - component handles look and feel
    - fetching data, business logic, etc, handled in helper functions 
    - this also helps when files get all big and gory 
  - don't be too cowardly to commit 
    - messy code review comments
  
### Keeping user in session
  - use effect hook when `main` loads in order to store the user in local storage
  - As an improvement, we can use the context hook to access things without passing them down.. don't go crazy 
    - don't put too much junk in context, that become the "god object" anti-pattern
    - https://reactjs.org/docs/context.html

### Composition
  - composition allows us to use the children of components (the parent components must NOT be self closing) like so `{ ...props.children }` 
    - the `...` is (probably?) a spread operator, destructuring/unpacking the children 
    - https://www.youtube.com/watch?v=3XaXKiXtNjw
    - https://dev.to/bouhm/thinking-in-react-component-composition-fp5

### useEffect Hook
  - useEffect renders whenever the component mounts, which is not the same as on page load
  - The `dependency array` is the second, optional argument in the useEffect function. 
    <!-- TODO: flesh out this understanding more? -->
    <!-- Extension: Better Comments -->

### Patterns
- Rather than passing in `props`, we destructure `props` in the parameter e.g. 
  `Card({studentName, showDequeue, imgUrl, question} ){....`