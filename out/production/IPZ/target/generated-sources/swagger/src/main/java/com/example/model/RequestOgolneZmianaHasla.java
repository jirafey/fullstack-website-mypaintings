package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * RequestOgolneZmianaHasla
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class RequestOgolneZmianaHasla   {
  @JsonProperty("stare_haslo")
  private String stareHaslo = null;

  @JsonProperty("nowe_haslo")
  private String noweHaslo = null;

  public RequestOgolneZmianaHasla stareHaslo(String stareHaslo) {
    this.stareHaslo = stareHaslo;
    return this;
  }

  /**
   * Get stareHaslo
   * @return stareHaslo
   **/
  @Schema(example = "stareHaslo123", required = true, description = "")
      @NotNull

    public String getStareHaslo() {
    return stareHaslo;
  }

  public void setStareHaslo(String stareHaslo) {
    this.stareHaslo = stareHaslo;
  }

  public RequestOgolneZmianaHasla noweHaslo(String noweHaslo) {
    this.noweHaslo = noweHaslo;
    return this;
  }

  /**
   * Get noweHaslo
   * @return noweHaslo
   **/
  @Schema(example = "noweHaslo456", required = true, description = "")
      @NotNull

    public String getNoweHaslo() {
    return noweHaslo;
  }

  public void setNoweHaslo(String noweHaslo) {
    this.noweHaslo = noweHaslo;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RequestOgolneZmianaHasla requestOgolneZmianaHasla = (RequestOgolneZmianaHasla) o;
    return Objects.equals(this.stareHaslo, requestOgolneZmianaHasla.stareHaslo) &&
        Objects.equals(this.noweHaslo, requestOgolneZmianaHasla.noweHaslo);
  }

  @Override
  public int hashCode() {
    return Objects.hash(stareHaslo, noweHaslo);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RequestOgolneZmianaHasla {\n");
    
    sb.append("    stareHaslo: ").append(toIndentedString(stareHaslo)).append("\n");
    sb.append("    noweHaslo: ").append(toIndentedString(noweHaslo)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
