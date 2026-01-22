# Agentic Task Manager

> **An intelligent, privacy-first task management system that turns natural language chat into structured actions using Local LLMs.**

![Status](https://img.shields.io/badge/Status-Development-blue)
![Stack](https://img.shields.io/badge/Stack-Django%20|%20React%20|%20LangChain-green)
![AI](https://img.shields.io/badge/AI-Ollama%20(Local)-orange)

## Overview

This is not just a To-Do list. It is an **Agentic System** designed to reduce the friction of task management. Instead of manually filling out forms, users simply chat with the system (e.g., *"I need to fix the OTP bug on Dihadi by Friday"*), and the backend Agent:
1.  **Parses** the intent (Title, Description, Priority, Deadline).
2.  **Routes** the task to the correct Workspace (e.g., "Startup" vs "Academics") based on semantic context.
3.  **Learns** from user corrections over time.

Built with a **Service-Oriented Architecture** inside Django to strictly separate "Business Logic" (AI) from "Interface Logic" (Views).

---

## Architecture

The system follows a strict **Two-Flow Architecture** to handle both standard CRUD and complex AI reasoning.

| Component | Tech | Role |
| :--- | :--- | :--- |
| **Backend** | Django Rest Framework (DRF) | API & Traffic Control |
| **Database** | PostgreSQL | Relational Data & Vectors |
| **AI Engine** | LangChain + Ollama | Logic & Parsing (The "Brain") |
| **LLM** | DeepSeek-R1:8b / Gemma:2b | Local Inference |
| **Infra** | Docker & Nginx | Containerization |

### The "Agentic" Flow
`User Input` -> `ChatAgentView` -> `AgentService` -> `LangChain` -> `Ollama (Host)` -> `Task Model` -> `Serializer` -> `JSON Response`

---

## Features

-   **Chat-to-Action:** Converts raw text into structured `Task` objects.
-   **Semantic Auto-Categorization:** Automatically routes tasks to workspaces (e.g., "Chem Lab" -> *Acads Workspace*) based on `ai_rules` defined in the model.
-   **Strict Data Isolation:** Custom Serializers ensure users can never see or assign tasks to workspaces they don't own.
-   **Fully Containerized:** Backend runs in Docker, communicating with Ollama on the host machine via internal networking.
-   **Production-Ready Security:** `read_only` fields for ownership, `get_queryset` filtering, and Signal-based default workspace creation.

---

## Prerequisites

* **Docker & Docker Compose**
* **Python 3.10+**
* **Ollama** (Running locally on macOS/Linux/Windows)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/agentic-task-manager.git](https://github.com/yourusername/agentic-task-manager.git)
cd agentic-task-manager