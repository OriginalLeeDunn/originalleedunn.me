import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ai-multi-agent",
    title: "AI Multi-Agent System",
    description: "A distributed AI system with multiple specialized agents working together.",
    longDescription: "This project implements a sophisticated multi-agent system where different AI agents with specialized capabilities collaborate to solve complex problems. The system uses a combination of natural language processing, computer vision, and reinforcement learning to enable agents to communicate, delegate tasks, and achieve common goals. The architecture is designed to be scalable and fault-tolerant, with agents able to join or leave the system dynamically.",
    tags: ["AI", "Python", "Distributed Systems", "NLP"],
    image: "/images/projects/ai-multi-agent.jpg",
    repo: "https://github.com/OriginalLeeDunn/ai-multi-agent",
    type: ["ai"],
    featured: true
  },
  {
    id: "game-prototype",
    title: "Procedural Game World",
    description: "A game prototype featuring procedurally generated environments.",
    longDescription: "This game prototype showcases advanced procedural generation techniques to create diverse and immersive game worlds. The system generates terrain, vegetation, structures, and points of interest algorithmically, ensuring no two playthroughs are the same. The project includes custom tools for world editing and a dynamic day/night cycle with weather systems. Built with Unity and C#, it demonstrates modern game development practices and optimization techniques.",
    tags: ["Unity", "C#", "Procedural Generation", "Game Dev"],
    image: "/images/projects/game-prototype.jpg",
    type: ["game"],
    featured: true
  },
  {
    id: "web3-dashboard",
    title: "Web3 Analytics Dashboard",
    description: "Real-time analytics for blockchain transactions and DeFi protocols.",
    longDescription: "A comprehensive dashboard that provides real-time analytics and visualization for various blockchain networks and DeFi protocols. The application tracks wallet activity, token prices, liquidity pools, and smart contract interactions across multiple chains. Built with React, TypeScript, and Web3.js, it features responsive design, real-time updates via WebSockets, and secure wallet integration. The project demonstrates modern web development practices and blockchain technology integration.",
    tags: ["React", "TypeScript", "Web3", "Blockchain"],
    image: "/images/projects/web3-dashboard.jpg",
    repo: "https://github.com/OriginalLeeDunn/web3-dashboard",
    type: ["web"],
    featured: true
  },
  {
    id: "ml-pipeline",
    title: "ML Pipeline for Image Recognition",
    description: "End-to-end machine learning pipeline for image classification.",
    longDescription: "An end-to-end machine learning pipeline for image classification tasks, from data collection and preprocessing to model training and deployment. The project includes data augmentation techniques, transfer learning with pre-trained models, and a REST API for model serving. The pipeline is containerized with Docker for easy deployment and includes monitoring and logging for production use. Built with PyTorch, FastAPI, and Kubernetes, it demonstrates best practices in MLOps and scalable ML systems.",
    tags: ["Python", "PyTorch", "Docker", "Kubernetes"],
    image: "/images/projects/ml-pipeline.jpg",
    type: ["ai"],
    featured: false
  },
  {
    id: "mobile-app",
    title: "Fitness Tracking App",
    description: "Mobile application for tracking workouts and nutrition.",
    longDescription: "A cross-platform mobile application built with React Native that helps users track their fitness journey. The app includes features for logging workouts, tracking nutrition, setting goals, and monitoring progress with detailed analytics. The backend is built with Node.js and MongoDB, with secure user authentication and data synchronization. The project demonstrates mobile app development best practices, including offline functionality, push notifications, and performance optimization.",
    tags: ["React Native", "Node.js", "MongoDB", "Mobile"],
    image: "/images/projects/fitness-app.jpg",
    type: ["mobile"],
    featured: false
  },
  {
    id: "ecommerce-platform",
    title: "Headless E-commerce Platform",
    description: "A modern headless e-commerce solution with a React frontend.",
    longDescription: "A headless e-commerce platform built with Next.js, TypeScript, and a custom Node.js backend. The platform features a modern, performant storefront with server-side rendering, a customizable admin dashboard, and integration with multiple payment gateways. The architecture follows microservices principles, with separate services for products, orders, payments, and users. The project demonstrates advanced web development techniques, including state management, API design, and performance optimization.",
    tags: ["Next.js", "TypeScript", "Node.js", "E-commerce"],
    image: "/images/projects/ecommerce.jpg",
    type: ["web"],
    featured: true
  }
];
