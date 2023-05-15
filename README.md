## Readme

This readme provides an explanation of the `Submit` component, including the components used and the libraries and plugins utilized.

### Component

The `Submit` component is a functional component written in React. It displays a container with a logo, a button, and a chart. When the button is clicked, it makes an HTTP request to retrieve text data from a URL. The text data is then processed to generate a word frequency histogram, which is displayed as a bar chart using the `react-chartjs-2` library. The generated histogram can also be exported as a CSV file.

#### External Libraries and Plugins

- `axios`: A popular JavaScript library used for making HTTP requests. It is used in this component to fetch the text data from a specified URL.

- `react-chartjs-2`: A React wrapper for Chart.js library that allows easy integration of charts into React applications. It is used to create the bar chart to display the word frequency histogram.

- `chart.js`: The underlying library that powers `react-chartjs-2`. It is used here to register the necessary chart components before initializing the chart.

### Explanation

The `Submit` component follows the standard React functional component syntax. It uses the `useState` and `useRef` hooks to manage state and create a reference to the chart component. The `useEffect` hook is used to clean up the chart instance when the component unmounts.

The `handleSubmit` function is triggered when the "Submit" button is clicked. It makes an HTTP GET request using `axios` to retrieve the text data from the specified URL. The received data is then processed to generate a word frequency histogram. The histogram data is stored in the component's state using the `setHistogramData` function.

The `handleExport` function is triggered when the "Export" button is clicked. It checks if the histogram data exists, and if so, it generates a CSV file containing the word-frequency data. The CSV file is then downloaded by creating a temporary anchor element.

The JSX in the return statement defines the layout and structure of the component. When the `histogramData` is null, only the "Submit" button is displayed. Once the `histogramData` is set, the "Export" button and the chart container are rendered, along with the `Bar` component from `react-chartjs-2`. The chart data is passed as props to the `Bar` component, and the necessary options for the chart are provided.

The `logo` image is imported and displayed using an `<img>` tag.

## Link to the website
https://teribbly-tiny-tales-assignment.vercel.app/
