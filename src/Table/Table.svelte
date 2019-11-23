<script>
import {flip} from 'svelte/animate';
import {quadInOut} from 'svelte/easing';

export let products = [];
export let name = "";
</script>

{#if name !== ""}
  <h4 class="">{name} Table</h4>
{/if}
<table style="margin: 0 auto; font-size: 1.5rem; text-align: right">
  <tbody>
    <tr>
      <th>id</th>
      <th>rank</th>
    </tr>

    {#each products as p (p.id)}
      <tr class="product-row" animate:flip="{{easing: quadInOut}}" >
        <td>{p.id}</td>
        <td>
          {#if p.rank}
            <span class="product-rank"
                  class:strike="{p.isIncorrectValue}"
            >{String(p.rank)}</span>
          {/if}
        </td>
      </tr>
    {/each}

  </tbody>
</table>

<style>
table {
  border-collapse: separate;
  border-spacing: 1rem 0.5rem;
}

.product-row {
}

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
  animation-name: strike;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;  
}
</style>