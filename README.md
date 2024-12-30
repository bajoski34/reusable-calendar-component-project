## Reusable React Calendar Component:

This is a reusable React component designed to be easily embedded into any website. It provides a flexible and modern calendar interface for seamless integration.

### Libraries/Frameworks Used

* Node.js: Version 22
* React Aria: Accessibility-focused React library for UI components
* Express.js: Backend framework for serving static assets


### Usage Guide

To integrate the reusable calendar component, follow the steps below:

1. Include the Stylesheet
Add the following <link> tag in the <head> section of your HTML file to include the necessary styles:

```html 
<link rel="stylesheet" href="https://reusable-calendar-component-project.onrender.com/assets/index-DZqdcNWe.css">
```
2. Add a Container Element
Insert a <div> element where the calendar will be rendered:

```html
<div id="calendar-container"></div>
```
3. Include the Script
Add the bundled JavaScript file to your project using the following <script> tag:

```html 
<script src="https://reusable-calendar-component-project.onrender.com/assets/index-B8IM7gcy.js"></script>
```

4. Initialize the Component

Use the initMyCalendar function to initialize the calendar with the required properties:

```html 
<script>
  window.initMyCalendar({
    companyId: "3", // Your unique company identifier
  });
</script>
```

Your final HTML structure should look like this:

```html 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Reusable React Calendar</title>
    <link rel="stylesheet" href="https://reusable-calendar-component-project.onrender.com/assets/index-DZqdcNWe.css">
  </head>
  <body>
    <div id="calendar-container"></div>
    <script src="https://reusable-calendar-component-project.onrender.com/assets/index-B8IM7gcy.js"></script>
    <script>
      window.initMyCalendar({
        companyId: "3",
      });
    </script>
  </body>
</html>

```

## Development Instructions

To build the component locally, run the following command in your terminal:

```html
nvm install && pnpm install && pnpm build
```

This command will generate the bundled assets for production, including the stylesheet and JavaScript files

The companyId is a required property for initialization. Customize it as per your integration requirements.
