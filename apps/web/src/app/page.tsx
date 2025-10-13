import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KotaDB - The Infrastructure for Autonomous Software Development",
  description:
    "The infrastructure layer for agent collaboration. The future of software is autonomous.",
};

export default function Home() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23ffffff'/></svg>"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.8;
            color: #2d3748;
            background: #fafafa;
            padding: 4rem 24rem;
            max-width: 50%;
            margin: 0 auto;
          }
          h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 2rem;
            line-height: 1.2;
            color: #1a202c;
            text-align: center;
          }
          h2 {
            font-size: 1.75rem;
            font-weight: 600;
            margin: 3rem 0 1.5rem;
            color: #1a202c;
          }
          h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 2rem 0 1rem;
            color: #2d3748;
          }
          p {
            margin: 1.5rem 0;
            font-size: 1.0625rem;
          }
          strong {
            font-weight: 600;
            color: #1a202c;
          }
          em {
            font-style: italic;
          }
          ul {
            margin: 1.5rem 0;
            padding-left: 1.75rem;
          }
          li {
            margin: 1rem 0;
            font-size: 1.0625rem;
          }
          table {
            width: 100%;
            margin: 2rem 0;
            border-collapse: collapse;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          th, td {
            text-align: left;
            padding: 1rem;
            border: 1px solid #e2e8f0;
          }
          th {
            font-weight: 600;
            background: #f7fafc;
            color: #2d3748;
          }
          td {
            background: #ffffff;
          }
          .waitlist {
            margin: 4rem 0;
            padding: 2rem 0;
            text-align: center;
          }
          .waitlist h2 {
            margin-top: 0;
            margin-bottom: 1rem;
          }
          .waitlist p {
            color: #4a5568;
            margin-bottom: 2rem;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 2rem;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
          input {
            padding: 0.5rem 0.75rem;
            font-size: 1rem;
            border: 1px solid #cbd5e0;
            border-radius: 2px;
            font-family: inherit;
            background: #ffffff;
          }
          input:focus {
            outline: 1px solid #2d3748;
            border-color: #2d3748;
          }
          button {
            padding: 0.5rem 1rem;
            font-size: 1rem;
            font-weight: 400;
            background: #2d3748;
            color: #ffffff;
            border: 1px solid #2d3748;
            border-radius: 2px;
            cursor: pointer;
            font-family: inherit;
          }
          button:hover {
            background: #1a202c;
          }
          button:disabled {
            background: #a0aec0;
            cursor: not-allowed;
            opacity: 0.6;
          }
          .message {
            padding: 0.75rem 1rem;
            margin-top: 1rem;
            font-size: 0.875rem;
            border-radius: 4px;
            border: 1px solid transparent;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          .message.visible {
            opacity: 1;
          }
          .message.success {
            color: #22543d;
            background-color: #f0fdf4;
            border-color: #86efac;
          }
          .message.success::before {
            content: '✓ ';
            font-weight: bold;
          }
          .message.error {
            color: #742a2a;
            background-color: #fef2f2;
            border-color: #fca5a5;
          }
          .message.error::before {
            content: '✕ ';
            font-weight: bold;
          }
          .date {
            text-align: center;
            font-size: 0.875rem;
            color: #718096;
            margin-bottom: 3rem;
          }
          .top-waitlist {
            margin: 2rem 0 3rem;
            padding: 1rem 0;
          }
          .top-waitlist form {
            display: flex;
            gap: 0.5rem;
            margin: 0 auto;
            max-width: 400px;
          }
          .top-waitlist input {
            flex: 1;
            padding: 0.625rem 0.875rem;
            font-size: 0.875rem;
            margin: 0;
          }
          .top-waitlist button {
            padding: 0.625rem 1.25rem;
            font-size: 0.875rem;
            white-space: nowrap;
          }
          .top-waitlist .message {
            margin-top: 0.75rem;
            padding: 0.625rem 0.875rem;
            font-size: 0.8125rem;
          }
          .footer {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid #e2e8f0;
            font-size: 0.875rem;
            color: #718096;
            text-align: center;
          }
          @media (max-width: 768px) {
            body {
              padding: 3rem 4rem;
              max-width: 70%;
            }
            h1 {
              font-size: 2rem;
            }
            h2 {
              font-size: 1.5rem;
            }
            h3 {
              font-size: 1.125rem;
            }
            .waitlist {
              padding: 2rem 0;
            }
            table {
              font-size: 0.875rem;
            }
            th, td {
              padding: 0.75rem 0.5rem;
            }
          }
          @media (max-width: 480px) {
            body {
              padding: 2rem 1.5rem;
              max-width: 90%;
            }
            h1 {
              font-size: 1.75rem;
            }
            h2 {
              font-size: 1.375rem;
              margin: 2.5rem 0 1.25rem;
            }
            p, li {
              font-size: 1rem;
            }
            .waitlist {
              padding: 1.5rem 0;
              margin: 3rem 0;
            }
            form {
              max-width: 100%;
            }
            .top-waitlist form {
              flex-direction: column;
            }
            .top-waitlist button {
              width: 100%;
            }
          }
        `,
          }}
        />
      </head>
      <body>
        <div className="date">Oct 13, 2025</div>
        <h1>kotadb: a manifesto for agentic engineering</h1>

        <div className="top-waitlist">
          <form id="top-waitlist-form">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            <button type="submit">join the waitlist</button>
          </form>
          <div id="top-message"></div>
        </div>

        <p>
          Agents are here. Not as prototypes or research novelties, but as
          production-grade intelligence. The premise behind KotaDB is simple:{" "}
          <strong>AGI exists</strong>. It&apos;s just hidden behind complexity,
          bad interfaces, and a mental model that hasn&apos;t caught up yet.
          Software engineering must now evolve around this fact.
        </p>

        <p>
          This isn&apos;t written for legacy engineers defending twenty-year-old
          workflows. It&apos;s for those who understand that everything we know
          about building software is about to invert.
        </p>

        <h2>the new paradigm</h2>

        <p>
          For decades, software was built for humans—IDEs, CI pipelines,
          linters, syntax highlighting, code reviews, Jira boards. All designed
          to optimize human cognition.
        </p>

        <p>
          <strong>That era is over.</strong>
        </p>

        <p>
          AI agents don&apos;t need dashboards or stand-ups. They need
          infrastructure: coordination, memory, and communication. The new
          challenge isn&apos;t &quot;Can AI write code?&quot; It&apos;s
          &quot;How do we get dozens of autonomous agents to collaborate like a
          high-functioning engineering team?&quot;
        </p>

        <p>That&apos;s what KotaDB answers.</p>

        <h2>why agents changed everything</h2>

        <p>
          An LLM doesn&apos;t need syntax highlighting. It needs unambiguous
          context, reproducible execution, and deterministic feedback. If
          you&apos;re still typing code manually, you&apos;re optimizing for
          nostalgia. The bottleneck isn&apos;t model capability
          anymore—it&apos;s human communication.
        </p>

        <p>
          When Claude Code or Codex fails, it&apos;s not because the
          model&apos;s dumb. It&apos;s because you&apos;re giving it incomplete
          or confusing instructions. Prompting is fine-tuning. Bad context
          equals bad output. The path forward is not to prompt harder—it&apos;s
          to build systems that make being correct easier than being wrong.
        </p>

        <p>
          That&apos;s the &quot;pit of success.&quot; Automated validation
          loops. Meta-agents writing specs for implementation agents. Zero
          confusion in the pipeline. When that clarity exists, these systems
          one-shot tasks the same way they do in benchmarks.
        </p>

        <h2>the inflection point</h2>

        <p>
          We are at the biggest shift since version control. The tools of the
          past were built to help humans coordinate. The next generation is
          about helping agents coordinate. GitHub was for human collaboration.
          KotaDB is for agent collaboration.
        </p>

        <h2>why now?</h2>

        <p>
          MCP just hit mainstream. But thousands of MCP servers are running with
          zero authentication. The protocol exists. The security doesn&apos;t.
          The orchestration doesn&apos;t. KotaDB solves both.
        </p>

        <p>
          This is a narrow window. The winners will be those who started today
          with standardized, production-grade tooling.
        </p>

        <h2>the problem</h2>

        <p>
          Every Claude Code or Cursor session today starts from scratch. Agents
          don&apos;t remember what they&apos;ve done or what others are doing.
          You, the human, are acting as the memory, the orchestrator, the
          scheduler. It&apos;s inefficient and brittle. You will lose if you
          continue to operate this way.
        </p>

        <p>
          Custom orchestration is worse. Hacky scripts chaining APIs together,
          state lost in JSON, collisions in Git branches. Everyone&apos;s
          rebuilding Kubernetes from scratch—only for agents.
        </p>

        <h2>the missing layer</h2>

        <p>
          What&apos;s missing is a shared operating system for autonomous
          software development—a platform layer for agent coordination.
        </p>

        <p>
          <strong>
            KotaDB provides it—and it&apos;s already running in production.
          </strong>{" "}
          Full SDLC pipelines automated end-to-end. Planning, implementation,
          testing, review, and documentation. This isn&apos;t theory. It works.
        </p>

        <p>
          Standardized Communication through MCP as a universal protocol for
          agents to talk across models and tools. Resource Isolation via Git
          worktrees as lightweight, isolated workspaces for concurrent
          development. Persistent Memory with stateful awareness of what&apos;s
          been planned, implemented, or reviewed. Security &amp; Multi-Tenancy
          with authentication, rate limits, and row-level security for
          production codebases. Workflow Orchestration supporting multi-agent
          pipelines with retry logic, validation loops, and persistent state.
          KotaDB treats LLMs as first-class citizens, not just tools.
        </p>

        <h2>the kotadb vision</h2>

        <p>
          KotaDB isn&apos;t a code search tool. Search is memory. The real value
          is orchestration: an infrastructure layer that coordinates hundreds of
          agents building software together.
        </p>

        <h2>a new development cycle</h2>

        <p>
          Issue Created: &quot;Add rate limiting to /api/search.&quot;
          <br />
          → Classifier Agent categorizes and indexes
          <br />
          → Planner Agent drafts spec and allocates workspace
          <br />
          → Implementor Agent writes code
          <br />
          → Validator Agent runs tests and flags errors
          <br />
          → Reviewer Agent approves implementation
          <br />
          → Documenter Agent updates docs
          <br />→ PR Agent merges and pushes
        </p>

        <p>
          <strong>Four minutes. Zero human input.</strong>
        </p>

        <p>
          Don&apos;t like this workflow? Build your own. KotaDB isn&apos;t a
          rigid framework—it&apos;s infrastructure. Customize agents to your
          codebase, your patterns, your team. Devon and Codex are
          general-purpose. KotaDB adapts to you.
        </p>

        <h2>the principles</h2>

        <p>
          Determinism + Creativity: Agents reason while infrastructure
          guarantees reliability. Composability through small, specialized
          agents connected via clear protocols. Silo avoidance using MCP, Git,
          Postgres—no new proprietary nonsense. Production-Grade by Default with
          real logging, auth, and testing. Multi-Vendor by Design where Claude,
          OpenAI, Gemini—all interoperable under KotaDB.
        </p>

        <h2>the future</h2>

        <p>
          Sooner than you think, the winners won&apos;t be the ones with the
          best LLMs—they&apos;ll be the ones with the best infrastructure for
          agent collaboration.
        </p>

        <p>
          <strong>
            KotaDB is that infrastructure: the collaboration layer for
            autonomous software development. The foundation for a world where
            agents write, test, and ship software at scale.
          </strong>
        </p>

        <p>
          <strong>
            The future of software is autonomous collaboration. The future is
            KotaDB.
          </strong>
        </p>

        <div className="waitlist">
          <h2>join the waitlist</h2>
          <p>
            We&apos;re opening beta access to the first 100 projects. If
            you&apos;re building something new and want to experience the future
            of SWE, you&apos;re in the right place.
          </p>
          <form id="waitlist-form">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            <button type="submit">Join Waitlist</button>
          </form>
          <div id="message"></div>
        </div>

        <div className="footer">
          <p>© 2025 KotaDB. All rights reserved.</p>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          async function handleWaitlistSubmit(formId, messageId) {
            const form = document.getElementById(formId);
            form.addEventListener('submit', async (e) => {
              e.preventDefault();
              const button = e.target.querySelector('button');
              const input = e.target.querySelector('input');
              const messageDiv = document.getElementById(messageId);
              const email = input.value;

              button.disabled = true;
              button.textContent = 'Joining...';
              messageDiv.textContent = '';
              messageDiv.className = 'message';

              try {
                const response = await fetch('/api/waitlist', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                  messageDiv.textContent = data.message || 'Successfully joined the waitlist!';
                  messageDiv.className = 'message success';
                  setTimeout(() => messageDiv.classList.add('visible'), 10);
                  input.value = '';
                } else {
                  messageDiv.textContent = data.error || 'Something went wrong. Please try again.';
                  messageDiv.className = 'message error';
                  setTimeout(() => messageDiv.classList.add('visible'), 10);
                }
              } catch (error) {
                messageDiv.textContent = 'Network error. Please try again.';
                messageDiv.className = 'message error';
                setTimeout(() => messageDiv.classList.add('visible'), 10);
              } finally {
                button.disabled = false;
                button.textContent = 'Join Waitlist';
              }
            });
          }

          handleWaitlistSubmit('top-waitlist-form', 'top-message');
          handleWaitlistSubmit('waitlist-form', 'message');
        `,
          }}
        />
      </body>
    </html>
  );
}
