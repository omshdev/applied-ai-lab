// 1. chunking decision.

import {fixedSizeChunker} from "./chunkers/fixed_size_chunker.js" 
import { markdownHeadingChunker } from "./chunkers/markdownHeadingChunker.js";
import {paragraphChunker} from "./chunkers/paragraph_chunker.js"
import {fifteen100} from "./text/1500.js"
import { markDown } from "./text/markDown.js";

// const response = fixedSizeChunker(fifteen100,500,100);
// const response = paragraphChunker(fifteen100);
const response = markdownHeadingChunker(markDown);
console.log(response);