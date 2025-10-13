import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KotaDB - The Operating System for Autonomous Software Development",
  description:
    "The infrastructure layer for agent collaboration. The future of software is autonomous.",
};

export default function ComingSoonPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            line-height: 1.6;
            color: #1a1a1a;
            background: #ffffff;
            padding: 2rem 1rem;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            font-size: 2rem;
            font-weight: 700;
            margin: 2rem 0 1rem;
            line-height: 1.2;
          }
          h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 2rem 0 1rem;
          }
          h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 1.5rem 0 0.75rem;
          }
          p {
            margin: 1rem 0;
          }
          strong {
            font-weight: 600;
          }
          em {
            font-style: italic;
          }
          ul {
            margin: 1rem 0;
            padding-left: 2rem;
          }
          li {
            margin: 0.5rem 0;
          }
          table {
            width: 100%;
            margin: 1.5rem 0;
            border-collapse: collapse;
          }
          th, td {
            text-align: left;
            padding: 0.75rem;
            border: 1px solid #e5e5e5;
          }
          th {
            font-weight: 600;
            background: #f9f9f9;
          }
          .waitlist {
            margin: 3rem 0;
            padding: 2rem;
            border: 2px solid #1a1a1a;
            background: #f9f9f9;
          }
          .waitlist h2 {
            margin-top: 0;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1.5rem;
          }
          input {
            padding: 0.75rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            font-family: inherit;
          }
          button {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-weight: 600;
            background: #1a1a1a;
            color: #ffffff;
            border: none;
            cursor: pointer;
            font-family: inherit;
          }
          button:hover {
            background: #333;
          }
          button:disabled {
            background: #999;
            cursor: not-allowed;
          }
          .message {
            padding: 0.75rem;
            margin-top: 1rem;
            border: 1px solid #ccc;
          }
          .message.success {
            background: #d4edda;
            border-color: #c3e6cb;
            color: #155724;
          }
          .message.error {
            background: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
          }
          .footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #e5e5e5;
            font-size: 0.875rem;
            color: #666;
          }
          @media (max-width: 640px) {
            body {
              padding: 1rem;
            }
            h1 {
              font-size: 1.5rem;
            }
            h2 {
              font-size: 1.25rem;
            }
            h3 {
              font-size: 1.1rem;
            }
            table {
              font-size: 0.875rem;
            }
          }
        `,
          }}
        />
      </head>
      <body>
        <h1>KotaDB: The Manifesto for Agentic Engineering</h1>

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

        <h2>The New Paradigm</h2>

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

        <h2>Why Agents Changed Everything</h2>

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

        <h2>The Inflection Point</h2>

        <p>
          We are at the biggest shift since version control. The tools of the
          past were built to help humans coordinate. The next generation is
          about helping agents coordinate. GitHub was for human collaboration.
          KotaDB is for agent collaboration.
        </p>

        <h2>The Problem</h2>

        <p>
          Every Claude Code or Cursor session today starts from scratch. Agents
          don&apos;t remember what they&apos;ve done or what others are doing.
          You, the human, are acting as the memory, the orchestrator, the
          scheduler. It&apos;s inefficient and brittle.
        </p>

        <p>
          Custom orchestration is worse. Hacky scripts chaining APIs together,
          state lost in JSON, collisions in Git branches. Everyone&apos;s
          rebuilding Kubernetes from scratch—only for agents.
        </p>

        <h2>The Missing Layer</h2>

        <p>
          What&apos;s missing is a shared operating system for autonomous
          software development—a platform layer for agent coordination.
        </p>

        <p>
          <strong>KotaDB provides it.</strong>
        </p>

        <ul>
          <li>
            <strong>Standardized Communication</strong> — MCP as a universal
            protocol for agents to talk across models and tools.
          </li>
          <li>
            <strong>Resource Isolation</strong> — Git worktrees as lightweight,
            isolated workspaces for concurrent development.
          </li>
          <li>
            <strong>Persistent Memory</strong> — Stateful awareness of
            what&apos;s been planned, implemented, or reviewed.
          </li>
          <li>
            <strong>Security &amp; Multi-Tenancy</strong> — Authentication, rate
            limits, and row-level security for production codebases.
          </li>
          <li>
            <strong>Workflow Orchestration</strong> — Multi-agent pipelines with
            retry logic, validation loops, and persistent state.
          </li>
        </ul>

        <h2>The KotaDB Vision</h2>

        <p>
          KotaDB isn&apos;t a code search tool. Search is memory. The real value
          is orchestration: an infrastructure layer that coordinates hundreds of
          agents building software together.
        </p>

        <table>
          <thead>
            <tr>
              <th>Human Stack</th>
              <th>Agent Stack</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GitHub → human collaboration</td>
              <td>KotaDB → agent collaboration</td>
            </tr>
            <tr>
              <td>Docker → app packaging</td>
              <td>Agent Tools → capability packaging</td>
            </tr>
            <tr>
              <td>Kubernetes → container orchestration</td>
              <td>KotaDB ADW → agent orchestration</td>
            </tr>
          </tbody>
        </table>

        <h2>A New Development Cycle</h2>

        <ul>
          <li>
            <strong>Issue Created</strong> → &quot;Add rate limiting to
            /api/search.&quot;
          </li>
          <li>
            <strong>Classifier Agent</strong> categorizes and indexes.
          </li>
          <li>
            <strong>Planner Agent</strong> drafts spec and allocates workspace.
          </li>
          <li>
            <strong>Implementor Agent</strong> writes code.
          </li>
          <li>
            <strong>Validator Agent</strong> runs tests, flags errors.
          </li>
          <li>
            <strong>Reviewer Agent</strong> approves implementation.
          </li>
          <li>
            <strong>Documenter Agent</strong> updates docs.
          </li>
          <li>
            <strong>PR Agent</strong> merges and pushes.
          </li>
        </ul>

        <p>
          <strong>Four minutes. Zero human input.</strong> This is not science
          fiction; it&apos;s a direct outcome of standardized agent
          infrastructure.
        </p>

        <p>
          Don&apos;t like this cycle? Throw it out. Build your own. Customize
          agents to your codebase, to how your system works, to how your team
          operates.
        </p>

        <h2>The Principles</h2>

        <ul>
          <li>
            <strong>Determinism + Creativity</strong> — Agents reason;
            infrastructure guarantees reliability.
          </li>
          <li>
            <strong>Composability</strong> — Small, specialized agents connected
            through clear protocols.
          </li>
          <li>
            <strong>Standards Over Silos</strong> — MCP, Git, Postgres. No new
            proprietary nonsense.
          </li>
          <li>
            <strong>Production-Grade by Default</strong> — Real logging, auth,
            and testing.
          </li>
          <li>
            <strong>Multi-Vendor by Design</strong> — Claude, OpenAI, Gemini—all
            interoperable under KotaDB.
          </li>
        </ul>

        <h2>Why It&apos;s Hard (and Why It&apos;s a Moat)</h2>

        <ul>
          <li>
            <strong>Security</strong> — 2,000+ exposed MCP servers prove no one
            else is doing this safely.
          </li>
          <li>
            <strong>Multi-Tenancy</strong> — Real isolation and state
            persistence are non-trivial.
          </li>
          <li>
            <strong>Production Scale</strong> — Few have run 60+ agent workflows
            on live codebases.
          </li>
          <li>
            <strong>Complex Workflows</strong> — Multi-phase SDLC automation
            requires deep engineering DNA.
          </li>
        </ul>

        <p>
          <strong>KotaDB solves all four. That&apos;s the moat.</strong>
        </p>

        <h2>The Market Reality</h2>

        <p>
          There are 31 million developers worldwide—a $3 trillion productivity
          market. Even 0.1% adoption at $75/month yields multi-million ARR. The
          path is clear:
        </p>

        <ul>
          <li>
            <strong>Today:</strong> Agentic early adopters.
          </li>
          <li>
            <strong>Next 6 months:</strong> Platform teams integrating AI into
            developer workflows.
          </li>
          <li>
            <strong>Next 12 months:</strong> AI-native startups whose entire
            engineering stack is autonomous.
          </li>
        </ul>

        <p>
          No one else is building multi-agent infrastructure for software
          development. The category begins here.
        </p>

        <h2>The Future</h2>

        <p>
          In five years, the winners won&apos;t be the ones with the best
          LLMs—they&apos;ll be the ones with the best infrastructure for agent
          collaboration.
        </p>

        <p>
          <strong>
            KotaDB is that infrastructure: the operating system for autonomous
            software development. The foundation for a world where agents write,
            test, and ship software at scale.
          </strong>
        </p>

        <p>
          <strong>
            The future of software is autonomous collaboration. The future is
            KotaDB.
          </strong>
        </p>

        <div className="waitlist">
          <h2>Join the Waitlist</h2>
          <p>
            Be among the first to experience the future of autonomous software
            development.
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
          <p>
            Written October 13 2025 by the KotaDB team.
            <br />© 2025 KotaDB. All rights reserved.
          </p>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          document.getElementById('waitlist-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = e.target.querySelector('button');
            const input = e.target.querySelector('input');
            const messageDiv = document.getElementById('message');
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
                input.value = '';
              } else {
                messageDiv.textContent = data.error || 'Something went wrong. Please try again.';
                messageDiv.className = 'message error';
              }
            } catch (error) {
              messageDiv.textContent = 'Network error. Please try again.';
              messageDiv.className = 'message error';
            } finally {
              button.disabled = false;
              button.textContent = 'Join Waitlist';
            }
          });
        `,
          }}
        />
      </body>
    </html>
  );
}
