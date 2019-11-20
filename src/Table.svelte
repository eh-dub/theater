<script>
import {flip} from 'svelte/animate';
import {quintInOut} from 'svelte/easing';

export let products = [];
export let name = "";
</script>

{#if name !== ""}
  <h4 class="">{name} Table</h4>
{/if}
<table style="margin: 0 auto; font-size: 2rem; text-align: right">
  <tbody>
    <tr>
      <th>id</th>
      <th>rank</th>
    </tr>

    {#each products as p (p.id)}
      <tr class="product-row" animate:flip="{{easing: quintInOut}}" >
        <td>{p.id}</td>
        <td>
          {#if p.rank}
            <span class="product-rank"
                  class:wrong-value="{p.isIncorrectValue}"
                  class:strike="{p.isIncorrectValue}"
            >{p.rank}</span>
          {/if}
        </td>
      </tr>
    {/each}

  </tbody>
</table>

<style>
/* .wrong-value {
  text-decoration-color: red;
  text-decoration-line: line-through;
  transition: text-decoration-line 2s;
} */

@keyframes strike{
  0%   { width : 0; }
  100% { width: 100%; }
}
.strike {
  position: relative;
}
.strike::after {
  background: linear-gradient(45deg, rgba(255, 15, 15, 1), rgba(255, 0, 0, 1));
  content: "";
  height: 0.5rem;
  left: 0;
  margin-top: calc(0.125em / 2 * -1);
  position: absolute;
  right: 0;
  top: 50%;
  /* animation: 4s linear 1s strike; */
  /* animation: 3s linear 1s 1 running strike; */
  /* animation: 3s linear 1s 2 reverse both paused strike; */
  animation-name: strike;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;  
}
</style>