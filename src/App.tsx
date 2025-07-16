import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import { presetPrintable, canvasFullSize } from "@grapesjs/studio-sdk-plugins";

function App() {
  const saveToSessionStorage = async (projectId, project) => {
    await waitAndFailRandomly("Testing when project save failed");
    sessionStorage.setItem(projectId, JSON.stringify(project));
  };

  const loadFromSessionStorage = async (projectId) => {
    await waitAndFailRandomly("Testing when project load failed");
    const projectString = sessionStorage.getItem(projectId);
    return projectString ? JSON.parse(projectString) : null;
  };

  const waitAndFailRandomly = async (str) => {
    await new Promise((res) => setTimeout(res, 1000)); // fake delay
    if (Math.random() >= 0.8) throw new Error(str);
  };

  return (
    <StudioEditor
      style={{ height: "100vh" }}
      options={{
        storage: {
          type: "self",
          autosaveChanges: 5,
          onSave: async ({ project }) => {
            await saveToSessionStorage("DEMO_PROJECT_ID", project);
            console.log("Project saved", { project });
          },
          onLoad: async () => {
            const project = await loadFromSessionStorage("DEMO_PROJECT_ID");
            console.log("Project loaded", { project });

            return {
              project: project || {
                pages: [
                  {
                    name: "Home",
                    component: { html: "" }, // initially empty; will inject below
                  },
                  { name: "About", component: { html: "<h1>About Page</h1>" } },
                  { name: "Shop", component: { html: "<h1>Shop Page</h1>" } },
                  { name: "Contact", component: { html: "<h1>Contact Page</h1>" } },
                ],
              },
            };
          },
        },
        project: {
          type: "web",
        },
        plugins: [
          editor => {
            editor.onReady(() => {
              const homePage = editor.Pages.getAll().find(p => p.getName() === "Home");
              const root = homePage?.getMainComponent();

              if (root && root.components().length === 0) {
                root.append(`
                  <!-- Navigation Bar -->
                  <header style="background:#1a1a1a; color:white; padding:1rem; position:sticky; top:0; z-index:100;">
                    <nav style="display:flex; justify-content:space-between; align-items:center; max-width:1200px; margin:0 auto;">
                      <div style="font-weight:bold; font-size:1.5rem;">MyStore</div>
                      <ul style="list-style:none; display:flex; gap:2rem; margin:0; padding:0;">
                        <li><a href="#" style="color:white; text-decoration:none; font-size:1rem;">Home</a></li>
                        <li><a href="#" style="color:white; text-decoration:none; font-size:1rem;">About</a></li>
                        <li><a href="#" style="color:white; text-decoration:none; font-size:1rem;">Shop</a></li>
                        <li><a href="#" style="color:white; text-decoration:none; font-size:1rem;">Contact</a></li>
                      </ul>
                    </nav>
                  </header>

                  <!-- Hero Section with Full-Size Image and Button -->
                  <section style="position:relative; height:80vh; display:flex; justify-content:center; align-items:center; overflow:hidden;">
                    <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0;" alt="Hero Image"/>
                    <div style="position:relative; z-index:10; text-align:center;">
                      <h1 style="color:white; font-size:2.5rem; margin-bottom:1rem; text-shadow:0 2px 4px rgba(0,0,0,0.5);">Discover Our Collection</h1>
                      <a href="#" style="background:#e74c3c; color:white; padding:0.75rem 2rem; border-radius:5px; text-decoration:none; font-size:1.2rem; transition:background 0.3s;">Shop Now</a>
                    </div>
                  </section>

                  <!-- Product Cards Section -->
                  <section style="padding:4rem 2rem; max-width:1200px; margin:0 auto;">
                    <h2 style="text-align:center; font-size:2rem; margin-bottom:2rem;">Our Products</h2>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:2rem;">
                      <div style="border:1px solid #ddd; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" style="width:100%; height:200px; object-fit:cover;" alt="Product 1"/>
                        <div style="padding:1rem;">
                          <h3 style="margin:0; font-size:1.2rem;">Running Shoes</h3>
                          <a href="#" style="display:inline-block; margin-top:0.5rem; color:#e74c3c; text-decoration:none;">Shop Now</a>
                        </div>
                      </div>
                      <div style="border:1px solid #ddd; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" style="width:100%; height:200px; object-fit:cover;" alt="Product 2"/>
                        <div style="padding:1rem;">
                          <h3 style="margin:0; font-size:1.2rem;">Headphones</h3>
                          <a href="#" style="display:inline-block; margin-top:0.5rem; color:#e74c3c; text-decoration:none;">Shop Now</a>
                        </div>
                      </div>
                      <div style="border:1px solid #ddd; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" style="width:100%; height:200px; object-fit:cover;" alt="Product 3"/>
                        <div style="padding:1rem;">
                          <h3 style="margin:0; font-size:1.2rem;">Smart Watch</h3>
                          <a href="#" style="display:inline-block; margin-top:0.5rem; color:#e74c3c; text-decoration:none;">Shop Now</a>
                        </div>
                      </div>
                    </div>
                  </section>

                  <!-- Testimonials Section -->
                  <section style="background:#f4f4f4; padding:4rem 2rem; max-width:1200px; margin:0 auto;">
                    <h2 style="text-align:center; font-size:2rem; margin-bottom:2rem;">What Our Customers Say</h2>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:2rem;">
                      <div style="background:white; padding:1.5rem; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" style="width:60px; height:60px; border-radius:50%; object-fit:cover; margin-bottom:1rem;" alt="Customer 1"/>
                        <h3 style="margin:0; font-size:1.2rem;">Jane Doe</h3>
                        <p style="margin:0.5rem 0; font-style:italic;">"Amazing quality products and fast delivery!"</p>
                      </div>
                      <div style="background:white; padding:1.5rem; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" style="width:60px; height:60px; border-radius:50%; object-fit:cover; margin-bottom:1rem;" alt="Customer 2"/>
                        <h3 style="margin:0; font-size:1.2rem;">John Smith</h3>
                        <p style="margin:0.5rem 0; font-style:italic;">"The best shopping experience I've ever had."</p>
                      </div>
                    </div>
                  </section>

                  <!-- Footer -->
                  <footer style="background:#1a1a1a; color:white; text-align:center; padding:2rem; margin-top:2rem;">
                    <div style="max-width:1200px; margin:0 auto;">
                      <p style="margin:0 0 1rem;">© 2025 MyStore. All rights reserved.</p>
                      <ul style="list-style:none; display:flex; justify-content:center; gap:2rem; margin:0; padding:0;">
                        <li><a href="#" style="color:white; text-decoration:none;">Privacy Policy</a></li>
                        <li><a href="#" style="color:white; text-decoration:none;">Terms of Service</a></li>
                        <li><a href="#" style="color:white; text-decoration:none;">Contact Us</a></li>
                      </ul>
                    </div>
                  </footer>
                `);
              }
            });
          },
        ],
      }}
    />
  );
}

export default App;