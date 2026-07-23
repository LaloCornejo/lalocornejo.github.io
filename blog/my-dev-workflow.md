# My Development Workflow in 2026

**Date:** 2026-05-01

**Tags:** workflow, tools, ai, productivity

---

AI coding tools have completely changed how I approach development. Here's my current setup.

## The Stack

- **OpenCode** — main AI orchestration for complex tasks
- **Claude Code** — terminal-first AI coding
- **Neovim** — editor with Lua config (dotfiles repo)
- **GitHub** — version control and CI/CD

## Agentic Workflows

The biggest shift has been moving from "write code manually" to "orchestrate agents." Instead of solving every problem myself, I decompose tasks and delegate to specialized agents.

### My workflow pattern:

1. **Plan** — break the problem into atomic steps
2. **Delegate** — spawn parallel agents for independent work
3. **Verify** — review output, run diagnostics, check tests
4. **Iterate** — fix issues found during verification

## Why this works

This approach lets me ship faster without sacrificing quality. The key is knowing when to delegate and when to do it yourself. Not everything needs an agent — simple config changes are faster to do manually.

## Tools I'm excited about

- **n8n** for workflow automation
- **Jira/Linear** for project tracking
- **Docker** for reproducible environments
- **Linux** as daily driver
